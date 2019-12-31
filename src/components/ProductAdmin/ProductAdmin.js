import React from 'react';
import './ProductAdmin.scss';
import { useEffect } from 'react';
import { useState } from 'react';
import { Icon, message, Card, Input, Button, Upload, Popconfirm, Select } from 'antd';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import { connect } from 'react-redux'


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

const ProductAdmin = ({ allProducts, setAllProducts }) => {
    useEffect(() => {
        getAllProducts()
    }, [])

    const [loadingPageproduct, setloadingPageproduct] = useState(true)
    const [edit, setEdit] = useState({
        name: '', show: false
    })
    const [newIMG, setNewIMG] = useState({
        gambar: '', name: ''
    });
    const [name, setName] = useState('')
    const [desc, setdesc] = useState('')
    const [price, setprice] = useState('')
    const [saveLoading, setSaveLoading] = useState(false)
    const [loadingChangeImg, setloadingChangeImg] = useState(false)
    const [coffeeCategory, setCoffeeCategory] = useState('')
    const { Option } = Select;


    const chooseEdit = (name, index) => {
        const theData = allProducts[index]
        setEdit(prev => {
            if (prev) setNewIMG({ gambar: theData.imageUrl, name: theData.name })
            return {
                name: prev.show ? '' : name, show: !prev.show
            }
        })
        setName(theData.name)
        setdesc(theData.desc)
        setprice(theData.price)
        setCoffeeCategory(theData.category)
    }

    const getAllProducts = () => {
        firebase.firestore().collection('products').get()
            .then(snap => {
                let data = []
                snap.forEach(item => {
                    data.push(item.data())
                })
                setAllProducts(data)
                setloadingPageproduct(false)
            })
            .catch(err => {
                message.error(err.message)
            })
    }

    const SAVE_EDIT = (id, imgURLasli) => {
        if (name === '' || desc === '' || price === '' || coffeeCategory === '') return message.warn('All field must be filled!')
        setSaveLoading(true)
        if (newIMG.gambar === imgURLasli) {
            SAVE_DB(imgURLasli, id)
        } else {
            firebase.storage().ref().child(`${name}`).putString(newIMG.gambar, 'data_url').then((snapshot) => {
                snapshot.ref.getDownloadURL().then(url => SAVE_DB(url, id))
            })
        }
    }

    const SAVE_DB = (url, id) => {
        firebase.firestore().collection('products').doc(id)
            .set({
                name, desc, price, imageUrl: url, category: coffeeCategory
            }, { merge: true })
            .then(() => {
                setSaveLoading(false)
                message.success('Done!')
                setEdit(false)
                getAllProducts()
            })
            .catch(err => {
                message.error(err.message);
                setSaveLoading(false)
            })
    }

    const handleChange = (info, names, uid) => {
        setNewIMG({ gambar: '', name: '' })
        if (info.file.status === 'uploading') {
            setloadingChangeImg(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setNewIMG({
                    gambar: imageUrl, name: names
                })
                setloadingChangeImg(false)
            }
            );
        }
    };


    return (
        <div className="ProductAdmin">
            {
                !loadingPageproduct ?
                    allProducts.map((item, index) => (
                        <div key={item.name} className="sampleProductItem">
                            <img src={newIMG.gambar && newIMG.name === item.name ? newIMG.gambar : item.imageUrl} alt="" />

                            <div style={{
                                width: '100%', display: 'flex', justifyContent: 'center', paddingTop: 10
                            }}>
                                {edit.name === item.name ? <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload}
                                    onChange={(e) => handleChange(e, item.name, item.id)}
                                >
                                    <Button loading={loadingChangeImg} style={{ marginTop: 10 }} type='danger'>Change Image</Button>
                                </Upload> : null}
                            </div>

                            <div className="productText">
                                {edit.name === item.name ?
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'space-between', width: '100%' }}>
                                        <Input placeholder='name' value={name}
                                            onChange={e => setName(e.target.value)}
                                            style={{ marginRight: 5 }} />
                                        <Input placeholder='description' value={desc}
                                            onChange={e => setdesc(e.target.value)}
                                            style={{ marginRight: 5 }} />
                                        <Input placeholder='price' value={price}
                                            onChange={e => setprice(e.target.value)}
                                            style={{ marginRight: 5 }} />
                                        <Select defaultValue={item.category} style={{ width: 120 }} onChange={(e) => setCoffeeCategory(e)}>
                                            <Option value="Coffee">Coffee</Option>
                                            <Option value="NonCoffee">Non Coffee</Option>
                                        </Select>

                                        <Button loading={saveLoading} onClick={() => SAVE_EDIT(item.id, item.imageUrl)} type='primary'>Save</Button>
                                    </div>
                                    :
                                    <>
                                        <h3 className='menuName'>{item.name}</h3>
                                        <p style={{ marginTop: 10, padding: '0 15px ', textAlign: 'center' }}>{item.desc}</p>
                                        <p className="price">Rp{item.price}</p>
                                        <p>{item.category === 'NonCoffee' ? 'Non Coffee' : 'Coffee'}</p>
                                    </>
                                }

                                <div style={{
                                    display: 'flex', width: 200, justifyContent: 'space-between', marginTop: 40
                                }}>
                                    <Icon onClick={() => chooseEdit(item.name, index)} type='edit' style={{ fontSize: '1.5em', color: 'green' }} />
                                    <Popconfirm title='Delete this product?' onConfirm={() => {
                                        setloadingPageproduct(true)
                                        firebase.firestore().collection('products').doc(item.id).delete()
                                            .then(() => {
                                                message.success('Deleted')
                                                setloadingPageproduct(false)
                                                getAllProducts()
                                            })
                                            .catch((err) => {
                                                message.error(err.message)
                                                setloadingPageproduct(false)
                                            })
                                    }}>
                                        <Icon type='delete' style={{ fontSize: '1.5em', color: 'red' }} />
                                    </Popconfirm>
                                </div>
                            </div>
                        </div>
                    )) : <Card style={{ width: '100%' }} loading={true} />}
        </div>
    );
}


const storeToProps = state => {
    return {
        allProducts: state.allProducts
    }
}

const dispatchToStore = dispatch => {
    return {
        setAllProducts: (data) => dispatch({ type: 'setAllProducts', data }),
    }
}

export default connect(storeToProps, dispatchToStore)(ProductAdmin);
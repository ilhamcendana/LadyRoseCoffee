import React from 'react';
import './AddProduct.scss';
import { Upload, Icon, message, Button, Input, Popconfirm, Select } from 'antd';
import { useState } from 'react';
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import { connect } from 'react-redux';


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


const AddProduct = ({ setAddNewProduct }) => {

    //state
    const [loading, setLoading] = useState(false)
    const [Btnloading, setBtnLoading] = useState(false)
    const [imageUrls, setImageUrl] = useState()
    const [coffeeName, setCoffeeName] = useState('')
    const [coffeeDesc, setCoffeeDesc] = useState('')
    const [coffeePrice, setCoffeePrice] = useState()
    const [coffeeCategory, setCoffeeCategory] = useState('Coffee')
    const { Option } = Select;

    //func
    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setLoading(false);
                setImageUrl(imageUrl)
            }
            );
        }
    };

    const uploadButton = (
        <div style={{ width: 382, height: 350, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 0 }}>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
    );


    const ADD_MENU = () => {
        if (imageUrls === '' || coffeeName === '' || coffeePrice === '' || coffeeCategory === '') return message.warn('All field must be filled!');
        setBtnLoading(true);

        const storageRef = firebase.storage().ref().child(`/${coffeeName}`);

        storageRef.putString(imageUrls, 'data_url').then((snapshot) => {
            snapshot.ref.getDownloadURL().then(url => {
                firebase.firestore().collection('products').add({
                    name: coffeeName,
                    desc: coffeeDesc,
                    price: coffeePrice,
                    imageUrl: url,
                    category: coffeeCategory
                })
                    .then((id) => {
                        firebase.firestore().collection('products').doc(id.id)
                            .set({
                                id: id.id
                            }, { merge: true })
                            .then(() => {
                                message.success('New menu added!!!')
                                setBtnLoading(false)
                                setCoffeeName('')
                                setCoffeePrice()
                                setImageUrl()
                                setCoffeeDesc('')
                                setAddNewProduct(coffeeName, coffeeDesc, coffeePrice, url, id.id)
                            })
                    })
                    .catch(err => {
                        message.error(err.message)
                    })
            })
        });
    }

    return (
        <div className="AddProduct">
            <div className="sampleProductItemAdmin">
                <div style={{
                    width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrls ?
                            <div style={{ width: 382, height: 350, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={imageUrls} alt="avatar" style={{ width: '100%' }} />
                            </div> : uploadButton}
                    </Upload>
                </div>
                <div className="productTextAdmin">
                    <Input value={coffeeName}
                        onChange={e => setCoffeeName(e.target.value)}
                        className='menuNameAdmin' placeholder='Name' />
                    <Input.TextArea style={{ marginBottom: 10 }} value={coffeeDesc} placeholder='Description' onChange={e => setCoffeeDesc(e.target.value)} />
                    <div style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                        <label style={{ color: '#82ae46' }}>Rp</label>
                        <Input value={coffeePrice}
                            onChange={e => setCoffeePrice(e.target.value)}
                            type='number' className="priceAdmin" placeholder='100000' />
                    </div>
                    <Select defaultValue="Coffee" style={{ width: 120, marginTop: 15 }} onChange={(e) => setCoffeeCategory(e)}>
                        <Option value="Coffee">Coffee</Option>
                        <Option value="NonCoffee">Non Coffee</Option>
                    </Select>
                </div>

                <Popconfirm title='Add this menu ?' onConfirm={ADD_MENU}>
                    <Button loading={Btnloading} style={{ margin: '20px 0' }} type='primary' shape='round'>Add!</Button>
                </Popconfirm>
            </div>

        </div>
    );
}

const dispatchToStore = dispatch => {
    return {
        setAddNewProduct: (name, desc, price, imgurl, id) => dispatch({ type: 'setAddNewProduct', name, desc, price, imgurl, id })
    }
}

export default connect(null, dispatchToStore)(AddProduct);
import React from 'react';
import { Table, Divider, Modal, message, Button, Input, Popconfirm } from 'antd';
import Jumbotron from '../components/Jumbotron/Jumbotron';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { useState } from 'react';


const Cart = ({ usersData, cartTotal }) => {
    useEffect(() => {
        getAllCarts()
    }, [])
    const [loadingTable, setLoadingTable] = useState(true)
    const [userCartData, setUserCartData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0)

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <img style={{
                        width: 100, height: 100
                    }} src={record.imageUrl} alt="" />
                    <span style={{ fontWeight: 'bold', marginTop: 5 }}>{text}</span>
                </div>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: text => <span>Rp {text}</span>
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text, record) => userCartData.map(item => item.id === record.id ? <span>Rp {parseInt(item.qty) * record.price}</span> : null)
        },
        {
            title: '',
            key: 'action',
            render: (text, record) =>
                <Popconfirm title='Are you sure want to delete this item?' onConfirm={() => deleteItem(record)}>
                    <Button type='primary' shape='round'>Delete</Button>
                </Popconfirm>
        },
    ];

    const [data, setData] = useState([]);

    const getTheExactCart = (cartData, cb) => {
        let clone = [...cartData]
        const ref = firebase.firestore().collection('products')

        clone.forEach(item => {
            ref.doc(item.id).get()
                .then(snap => {
                    setData(prev => {
                        let sampleny = [...prev]
                        sampleny.push(snap.data())
                        sampleny.forEach(items => {
                            if (items.id === item.id) {
                                items.qty = item.qty
                            }
                        })
                        return sampleny
                    })
                    setTotalPrice(prev => {
                        let newVal = prev
                        newVal = newVal + (parseInt(snap.data().price) * item.qty)
                        return newVal
                    })
                    setLoadingTable(false)
                })
        })
    }

    const getAllCarts = () => {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
            .then(snap => {
                if (snap.data().cart.length > 0) {
                    getTheExactCart(snap.data().cart)
                    setUserCartData(snap.data().cart)
                } else {
                    setLoadingTable(false)
                }
            })
            .catch(err => {
                message.error(err.message)
            })
    }

    const [modalVisible, setModalVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [address, setAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const handleOk = () => {
        if (address === '' || postalCode === '' || phoneNumber === '') return message.warning('All field must be filled!')
        setConfirmLoading(true)

        const userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        const ref = firebase.firestore().collection('orders').doc(firebase.auth().currentUser.uid)
        ref.get()
            .then(snap => {
                const DATANYA = {
                    address: address, postalCode: postalCode, phoneNumber: phoneNumber,
                    totalPrice: totalPrice, products: data, complete: false, payment: false, uid: firebase.auth().currentUser.uid
                }
                if (snap.exists) {
                    let newPesanan = [...snap.data().pesanan]
                    newPesanan.push(DATANYA)
                    ref.set({ pesanan: newPesanan }, { merge: true })
                        .then(() => {
                            userRef.set({ cart: [] }, { merge: true })
                                .then(() => {
                                    message.success('Congarts!!, the order has been made')
                                    setConfirmLoading(false)
                                    setModalVisible(false)
                                    setData([])
                                    setTotalPrice(0)
                                    window.location.pathname = '/order'
                                })
                                .catch(err => {
                                    message.error(err.message)
                                })
                        })
                } else {
                    let kosong = []
                    kosong.push(DATANYA)
                    ref.set({ pesanan: kosong }, { merge: true })
                        .then(() => {
                            userRef.set({ cart: [] }, { merge: true })
                                .then(() => {
                                    message.success('Congarts!!, the order has been made')
                                    setConfirmLoading(false)
                                    setModalVisible(false)
                                    setData([])
                                    setTotalPrice(0)
                                    window.location.pathname = '/order'
                                })
                                .catch(err => {
                                    message.error(err.message)
                                })
                        })
                }
            })
    }

    const proceedModal = (
        <Modal
            title="Shipping Information"
            visible={modalVisible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={() => setModalVisible(false)}
            closable={false}
        >
            <Input value={address} onChange={e => setAddress(e.target.value)} placeholder='Address' />
            <Input value={postalCode} onChange={e => setPostalCode(e.target.value)} style={{ margin: '10px 0' }} placeholder='Postal Code' />
            <Input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder='Phone Number' addonBefore='+62' />
            <p style={{ marginTop: 10 }}>Your total price is Rp {totalPrice}</p>
        </Modal>
    )


    const deleteItem = (record, cb) => {
        setLoadingTable(true)
        const ref = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        ref.get()
            .then(snap => {
                let sampleCart = [...snap.data().cart]
                let newCart = sampleCart.filter(item => item.id !== record.id)
                ref.set({
                    cart: newCart
                }, { merge: true })
                    .then(() => {
                        setData(prev => {
                            let previous = [...prev]
                            let next = previous.filter(sn => sn.id !== record.id)
                            return next
                        })
                        message.success('Item deleted', .5)
                            .then(() => window.location.reload())
                    })
                    .catch(err => {
                        message.error(err.message)
                    })
            })
    }

    return (
        <>
            <div className="Cart">
                <Jumbotron jmbText='CART' jmbBG='https://i1.wp.com/farmershares.com/wp-content/uploads/2019/06/beverage-1840426_1920.jpg?ssl=1' />
                <div style={{ padding: '0 15px', display: 'flex', flexDirection: 'column', width: '100%', margin: '50px 0' }}>
                    <Table pagination={false} columns={columns} dataSource={data} loading={loadingTable} style={{ width: '100%' }} />

                    <div style={{
                        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: 30
                    }}>
                        <div style={{
                            border: '1px solid #929292', padding: 30
                        }}>
                            <h3 style={{ textAlign: 'center' }}>Cart Totals</h3>

                            <div>
                                <p><span style={{ fontWeight: 'bold', marginRight: 5 }}>Total:</span>Rp {totalPrice}</p>
                                <Button disabled={loadingTable} type='primary' shape='round' onClick={() => setModalVisible(true)}>Proceed to checkout</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {proceedModal}
        </>
    );
}

const storeToProps = state => {
    return {
        usersData: state.usersData,
        cartTotal: state.cartTotal
    }
}

export default connect(storeToProps)(Cart);
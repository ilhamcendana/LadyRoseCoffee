import React from 'react';
import { useEffect } from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import { useState } from 'react';
import { message, Card, Icon, Button, Upload, Popconfirm } from 'antd';
import Jumbotron from '../components/Jumbotron/Jumbotron';

const { Meta } = Card;

const Order = () => {
    useEffect(() => {
        getOrderHA()
    }, [])

    const [orderData, setOrderData] = useState([])

    const getOrderHA = () => {
        firebase.firestore().collection('orders').doc(firebase.auth().currentUser.uid).get()
            .then(snap => {
                setOrderData(snap.data().pesanan)
            })
            .catch(err => {
                message.error(err.message)
            })
    }

    return (
        <div className="Order">
            <Jumbotron jmbText='ORDER' jmbBG='https://i1.wp.com/farmershares.com/wp-content/uploads/2019/06/beverage-1840426_1920.jpg?ssl=1' />
            {orderData.address === '' ? <Card loading={true} style={{ width: '100%' }} /> :
                <div style={{ animation: 'welcome .3s', width: '100%', padding: '0 15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 50 }}>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                            {orderData.map((items, indexs) => (
                                <div style={{ border: '1px solid #929292', padding: 30, marginBottom: 20, width: 500 }}>
                                    <div style={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'space-around' }}>
                                        {items.products.map(item => (
                                            <Card
                                                key={item.address}
                                                style={{ width: 200 }}
                                                cover={
                                                    <img
                                                        style={{ width: '100%', height: 150 }}
                                                        alt="example"
                                                        src={item.imageUrl}
                                                    />
                                                }
                                            >
                                                <Meta
                                                    title={`${item.name}`}
                                                    description={`Q: ${item.qty}`}
                                                />
                                            </Card>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: 50 }}>
                                        <p>Address: {items.address}</p>
                                        <p>Phone: {items.phoneNumber}</p>
                                        <p>Postal Code: {items.postalCode}</p>
                                        <p>Total: {items.totalPrice}</p>
                                    </div>

                                    {items.payment ?
                                        items.complete ?
                                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                <h3>Thanks, your coffee will be arrived</h3>
                                            </div>
                                            :
                                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                <h3>Your payment is on review</h3>
                                            </div>
                                        :
                                        <div style={{ width: '39%', display: 'flex' }}>
                                            <Upload
                                                name='file'
                                                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                                                headers={{ authorization: 'authorization-text' }}
                                                onChange={(info) => {
                                                    if (info.file.status !== 'uploading') {
                                                        message.loading('Loading...')
                                                    }
                                                    if (info.file.status === 'done') {
                                                        firebase.storage().ref().child(`order-${new Date().getMilliseconds()}`)
                                                            .put(info.file.originFileObj)
                                                            .then(hh => hh.ref.getDownloadURL().then(url => {
                                                                const ref = firebase.firestore().collection('orders').doc(firebase.auth().currentUser.uid)
                                                                ref.get()
                                                                    .then(snap => {
                                                                        let samples = [...snap.data().pesanan]
                                                                        samples[indexs].payment = true
                                                                        samples[indexs].paymentUrl = url
                                                                        ref.set({
                                                                            pesanan: samples,
                                                                        }, { merge: true })
                                                                            .then(() => {
                                                                                message.success(`${info.file.name} file uploaded successfully`);
                                                                                getOrderHA()
                                                                            })
                                                                    })
                                                            }))
                                                    } else if (info.file.status === 'error') {
                                                        message.error(`${info.file.name} file upload failed.`);
                                                    }
                                                }}
                                            >
                                                <Button type='primary'>
                                                    <Icon type="upload" /> Send proof of payment
                                            </Button>
                                            </Upload>

                                            <Popconfirm title='Are you sure?' onConfirm={() => {
                                                message.loading('Loading...')
                                                    .then(() => {
                                                        firebase.firestore().collection('orders').doc(firebase.auth().currentUser.uid).get()
                                                            .then(snap => {
                                                                let sampleLg = [...snap.data().pesanan]
                                                                sampleLg.splice(indexs, 1)
                                                                firebase.firestore().collection('orders').doc(firebase.auth().currentUser.uid)
                                                                    .set({ pesanan: sampleLg }, { merge: true })
                                                                    .then(() => {
                                                                        getOrderHA()
                                                                    })
                                                            })
                                                    })
                                            }}>
                                                <Button type='danger' style={{ marginLeft: 10 }}>Cancel order</Button>
                                            </Popconfirm>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div >
    );
}

export default Order;
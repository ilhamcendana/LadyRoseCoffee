import React from 'react';
import { useEffect } from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import { useState } from 'react';
import { Card, Button, Popconfirm, message } from 'antd';

const { Meta } = Card

const AdminOrders = () => {
    useEffect(() => {
        getAdminOrders()
    }, [])

    const [allOrders, setAllOrders] = useState([])

    const getAdminOrders = () => {
        firebase.firestore().collection('orders').get()
            .then(snap => {
                let sample = []
                let ini = []
                snap.forEach(item => {
                    sample.push(item.data().pesanan)
                })
                sample.forEach((item, index) => {
                    if (item[index].payment) {
                        ini.push(item[index])
                    }
                })
                setAllOrders(ini)
            })
    }
    return (
        <div>
            {allOrders.map((item, index) => (
                <div key={item.address} style={{ border: '1px solid #929292', padding: 25 }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around', overflowX: 'auto' }}>
                        {item.products.map(items => (
                            <Card
                                style={{ width: 200 }}
                                cover={
                                    <img
                                        style={{ width: '100%', height: 150 }}
                                        alt="example"
                                        src={items.imageUrl}
                                    />
                                }
                            >
                                <Meta
                                    title={`${items.name}`}
                                    description={`Q: ${items.qty}`}
                                />
                            </Card>
                        ))}
                    </div>

                    <div style={{ marginTop: 50 }}>
                        <p>Address: {item.address}</p>
                        <p>Phone: {item.phoneNumber}</p>
                        <p>Postal Code: {item.postalCode}</p>
                        <p>Total: Rp{item.totalPrice}</p>
                        <p>Bukti Pembayaran</p>
                        <img src={item.paymentUrl} style={{ width: 400, height: 350 }} alt="" />
                    </div>

                    {item.complete ?
                        <h3>Already paid</h3>
                        :
                        <Popconfirm title='Are you sure?' onConfirm={() => {
                            const refff = firebase.firestore().collection('orders').doc(item.uid)
                            message.success('Loading...')
                                .then(() => {
                                    refff.get()
                                        .then(snap => {
                                            let samplekan = [...snap.data().pesanan]
                                            samplekan.forEach(ini => {
                                                if (ini.paymentUrl === item.paymentUrl) {
                                                    ini.complete = true
                                                }
                                            })
                                            refff.set({ pesanan: samplekan }, { merge: true })
                                                .then(() => {
                                                    message.success('SUCCESS!!')
                                                    getAdminOrders()
                                                })
                                        })
                                })
                        }}>
                            <Button type='primary' shape='round'>CONFIRM</Button>
                        </Popconfirm>}
                </div>
            ))}
        </div>
    );
}

export default AdminOrders;
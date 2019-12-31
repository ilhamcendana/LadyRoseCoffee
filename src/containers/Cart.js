import React from 'react';
import { Table, Divider, Tag, message, Button } from 'antd';
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
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty',
            render: (text, record) => userCartData.map(item => item.id === record.id ? <span>{item.qty}</span> : null)
        },
        {
            title: 'Total Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text, record) => userCartData.map(item => item.id === record.id ? <span>{parseInt(item.qty) * record.price}</span> : null)
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a>Delete</a>
                </span>
            ),
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
                        let duh = [...prev]
                        duh.push(snap.data())
                        return duh
                    })
                    setTotalPrice(prev => {
                        let newVal = prev
                        newVal = newVal + parseInt(snap.data().price)
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

    return (
        <div className="Cart">
            <Jumbotron jmbText='CART' jmbBG='https://i1.wp.com/farmershares.com/wp-content/uploads/2019/06/beverage-1840426_1920.jpg?ssl=1' />
            <div style={{ padding: '0 15px', display: 'flex', flexDirection: 'column', width: '100%', margin: '50px 0' }}>
                <Table pagination={false} columns={columns} dataSource={data} loading={loadingTable} style={{ width: '100%' }} />

                <div style={{
                    width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: 30
                }}>
                    <div style={{
                        width: 200
                    }}>
                        <h3 style={{ textAlign: 'center' }}>Cart Totals</h3>

                        <div>
                            <p><span style={{ fontWeight: 'bold', marginRight: 5 }}>Total:</span>{totalPrice}</p>
                            <Button disabled={loadingTable} type='primary' shape='round'>Proceed to checkout</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const storeToProps = state => {
    return {
        usersData: state.usersData,
        cartTotal: state.cartTotal
    }
}

export default connect(storeToProps)(Cart);
import React, { useState } from 'react';
import coffee from '../../assets/coffee.svg';
import './SampleProducts.scss';
import { Icon, Tooltip, Divider, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { connect } from 'react-redux';

const SampleProducts = ({ isAuth, cariTotalCart, changeCart }) => {
    useEffect(() => {
        firebase.firestore().collection('systems').doc('home').get()
            .then(snap => {
                setgetYourCoffee(snap.data().getYourCoffee)
            })
            .catch(err => {
                message.error(err.message)
            })

        firebase.firestore().collection('products').limit(6).get()
            .then(snap => {
                let sampleeee = []
                snap.forEach(item => {
                    sampleeee.push(item.data())
                })
                setSampleProductItems(sampleeee)
            })
    }, [])
    const [sampleProductItems, setSampleProductItems] = useState([])

    const [getYourCoffee, setgetYourCoffee] = useState('Loading...')
    const [cartBtnLoading, setcartBtnLoading] = useState(false)

    const AddToCart = (id) => {
        if (isAuth) {
            setcartBtnLoading(true)
            message.loading('adding to cart', () => {
                const ref = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                let samaga = false
                ref.get()
                    .then(snap => {
                        let sampleCart = [...snap.data().cart]
                        sampleCart.forEach((item, index) => {
                            if (item.id === id) {
                                samaga = true
                                tambahQTY(sampleCart, index, ref, id)
                            }
                        })
                        if (!samaga) tambahBaru(id, sampleCart, ref)
                    })
            })
        } else {
            message.warning('You need to login to your account or make one')
        }
    }

    const tambahBaru = (id, sampleCart, ref) => {
        sampleCart.push({
            id: id, qty: 1
        })
        ref.set({ cart: sampleCart }, { merge: true })
            .then(() => {
                setcartBtnLoading(false)
                message.success('Added to cart')
                changeCart('inc', { id: id, qty: 1 })
                cariTotalCart()
            })
            .catch(err => {
                message.error(err.message)
            })
    }

    const tambahQTY = (sampleCart, index, ref, id) => {
        const newSamplecart = [...sampleCart]
        newSamplecart[index].qty = parseInt(newSamplecart[index].qty) + 1
        ref.set({ cart: newSamplecart }, { merge: true })
            .then(() => {
                setcartBtnLoading(false)
                message.success('Added to cart')
                changeCart('tmbhQty', index)
                cariTotalCart()
            })
            .catch(err => {
                message.error(err.message)
            })
    }
    return (
        <div className='SampleProducts'>
            <h1>Get Your Coffee</h1>
            <p>{getYourCoffee}</p>
            <Divider />

            <div className="containerSample">
                {sampleProductItems.map((item, index) => (
                    <div key={item.name} className="sampleProductItem" style={{ marginBottom: index + 1 === sampleProductItems.length ? 0 : 50 }}>
                        <img src={item.imageUrl} alt="" />
                        <div className="productText">
                            <h3 className='menuName'>{item.name}</h3>
                            <p className='desc'>{item.desc}</p>
                            <p className="price">Rp{item.price}</p>
                            <Tooltip title="Add to cart">
                                <Button icon='shopping-cart' type='primary' shape='round' onClick={() => AddToCart(item.id)} loading={cartBtnLoading} ></Button>
                            </Tooltip>
                        </div>
                    </div>
                ))}
            </div>

            <Link style={{ marginTop: 100, }} to='/Shop'>
                <Button type='primary' shape='round' style={{ boxShadow: '1px 2px 3px rgba(0,0,0,.4)' }} size='large'>MORE</Button>
            </Link>
        </div>
    );
}

const storeToProps = state => {
    return {
        isAuth: state.isAuth
    }
}

const dispatchToStore = dispatch => {
    return {
        changeCart: (diapain, prods) => dispatch({ type: 'changeCart', diapain, prods }),
        cariTotalCart: () => dispatch({ type: 'cariTotalCart' })
    }
}

export default connect(storeToProps, dispatchToStore)(SampleProducts);
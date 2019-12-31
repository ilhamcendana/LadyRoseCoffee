import React from 'react';
import './ProductShop.scss';
import { Icon, Tooltip, Card, message } from 'antd';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { connect } from 'react-redux';

const ProductShop = ({ isAuth, ProductItems, changeCart, cariTotalCart }) => {

    //func
    const AddToCart = (id) => {
        if (isAuth) {
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
                message.success('Added to cart')
                changeCart('tmbhQty', index)
                cariTotalCart()
            })
            .catch(err => {
                message.error(err.message)
            })
    }

    return (
        <div className="ProductShop">
            {ProductItems[0] === 'none' ? <h1 style={{ textAlign: 'center', alignSelf: 'center', width: '100%' }}>THIS CATEGORY IS EMPTY</h1> :
                ProductItems.length < 1 ? <Card style={{ width: '100%' }} loading={true} />
                    : ProductItems.map((item, index) => (
                        <div key={item.name} className="sampleProductItem" style={{ marginBottom: index + 1 === ProductItems.length ? 0 : 50 }}>
                            <img src={item.imageUrl} alt="" />
                            <div className="productText">
                                <h3 className='menuName'>{item.name}</h3>
                                <p className='desc'>{item.desc}</p>
                                <p className="price">Rp{item.price}</p>
                                <Tooltip title="Add to cart">
                                    <Icon onClick={() => AddToCart(item.id)} className='shopping-cart' type='shopping-cart' />
                                </Tooltip>
                            </div>
                        </div>
                    ))}
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

export default connect(storeToProps, dispatchToStore)(ProductShop);
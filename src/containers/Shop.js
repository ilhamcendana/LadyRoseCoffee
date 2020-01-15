import React from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'

import Jumbotron from '../components/Jumbotron/Jumbotron';
import Category from '../components/Category/Category';
import ProductShop from '../components/ProductShop/ProductShop';
import { useEffect } from 'react';
import { useState } from 'react';
import { message } from 'antd';


const Shop = () => {
    useEffect(() => {
        getAllProds()
    }, [])

    //state 
    const [allProds, setAllProds] = useState([])

    //func 
    const getAllProds = () => {
        firebase.firestore().collection('products').where('category', '==', 'Coffee').orderBy("name").get()
            .then(snap => {
                let getEach = []
                snap.forEach(item => {
                    getEach.push(item.data())
                })
                setAllProds(getEach)
            })
            .catch(err => {
                message.error(err.message)
            })
    }

    const changeCategory = (query) => {
        setAllProds([])
        firebase.firestore().collection('products').where("category", '==', query).orderBy("name").get()
            .then(snap => {
                let getEach = []
                if (snap.empty) return setAllProds(['none'])
                snap.forEach(item => {
                    getEach.push(item.data())
                })
                setAllProds(getEach)
            })
            .catch(err => {
                message.error(err.message)
                console.log(err.message)
            })
    }
    return (
        <div className="Shop">
            <Jumbotron jmbText='SHOP' jmbBG='https://i1.wp.com/farmershares.com/wp-content/uploads/2019/06/beverage-1840426_1920.jpg?ssl=1' />

            <Category changeCategory={(query) => changeCategory(query)} />
            <ProductShop ProductItems={allProds} />
        </div>
    );
}

export default Shop;
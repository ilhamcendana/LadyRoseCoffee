import React from 'react';
import './Category.scss';
import { useState } from 'react';

const Category = ({ changeCategory }) => {

    //state
    const [chooseCategory, setChooseCategory] = useState('Coffee')


    const categoryItems = [
        {
            name: 'Coffee',
            query: 'Coffee'
        },
        {
            name: 'Non Coffee',
            query: 'NonCoffee'
        }
    ]

    const PickCategory = (name, query) => {
        if (name === chooseCategory) return null
        changeCategory(query)
        setChooseCategory(name)
    }
    return (
        <div className="Category">
            {categoryItems.map(item => (
                <div
                    onClick={() => PickCategory(item.name, item.query)}
                    style={{
                        backgroundColor: chooseCategory === item.name ? '#333' : '#fff',
                        color: chooseCategory === item.name ? '#fff' : '#000',
                    }} className='categoryItems' key={item.name}>
                    <p>{item.name}</p>
                </div>
            ))}
        </div>
    );
}

export default Category;
import React from 'react';
import coffee from '../../assets/coffee.svg';
import './SampleProducts.scss';
import { Icon, Tooltip, Divider } from 'antd';

const SampleProducts = () => {
    const sampleProductItems = [
        {
            img: coffee,
            menuName: 'Cappucino',
            price: '30000'
        },
        {
            img: coffee,
            menuName: 'Cappucinos',
            price: '30000'
        },
        {
            img: coffee,
            menuName: 'Cappucinof',
            price: '30000'
        },
        {
            img: coffee,
            menuName: 'Cappucinoc',
            price: '30000'
        },
        {
            img: coffee,
            menuName: 'Cappucinose',
            price: '30000'
        },
        {
            img: coffee,
            menuName: 'Cappucinofg',
            price: '30000'
        }
    ]
    return (
        <div className='SampleProducts'>
            <Divider />
            <h1>Get Your Coffee</h1>
            <p>bla bla bla bla bla bla</p>

            <div className="containerSample">
                {sampleProductItems.map(item => (
                    <div key={item.menuName} className="sampleProductItem">
                        <img src={item.img} alt="" />
                        <div className="productText">
                            <h3 className='menuName'>{item.menuName}</h3>
                            <p className="price">Rp{item.price} <Tooltip title="Add to cart">
                                <Icon className='shopping-cart' type='shopping-cart' />
                            </Tooltip></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SampleProducts;
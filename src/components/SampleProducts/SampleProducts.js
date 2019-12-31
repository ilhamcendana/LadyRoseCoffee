import React from 'react';
import coffee from '../../assets/coffee.svg';
import './SampleProducts.scss';
import { Icon, Tooltip, Divider, Button } from 'antd';
import { Link } from 'react-router-dom';

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
            <h1>Get Your Coffee</h1>
            <p>bla bla bla bla bla bla</p>
            <Divider />

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

            <Link style={{ marginTop: 100, }} to='/Shop'>
                <Button type='primary' shape='round' style={{ boxShadow: '1px 2px 3px rgba(0,0,0,.4)' }} size='large'>MORE</Button>
            </Link>
        </div>
    );
}

export default SampleProducts;
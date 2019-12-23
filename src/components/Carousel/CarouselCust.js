import React from 'react';
import { Carousel } from 'antd';
import './Carousel.scss';

const CarouselCust = () => {
    const carouselItems = [
        {
            title: 'Coffee & Chill',
            imgurl: 'https://i1.wp.com/farmershares.com/wp-content/uploads/2019/06/beverage-1840426_1920.jpg?ssl=1'
        },
        {
            title: 'A bad day with coffee is better than a good day without it',
            imgurl: 'https://i0.wp.com/roam-coffee.com/wp-content/uploads/2019/03/were-open-sign.jpg?ssl=1'
        },
        {
            title: 'Life begins after coffee',
            imgurl: 'https://i0.wp.com/roam-coffee.com/wp-content/uploads/2019/03/were-open-sign.jpg?ssl=1'
        }
    ]
    return (
        <Carousel autoplay effect="fade">
            {carouselItems.map(item => (
                <div key={item.title}>
                    <div style={{ backgroundImage: `url(${item.imgurl})` }} className='carouselItem'>
                        <h3>{item.title}</h3>
                    </div>
                </div>
            ))}
        </Carousel>
    );
}

export default CarouselCust;
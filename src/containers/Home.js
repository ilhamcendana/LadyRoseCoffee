import React from 'react';
import Carousel from '../components/Carousel/CarouselCust';
import Kelebihan from '../components/Kelebihan/Kelebihan';
import SampleProducts from '../components/SampleProducts/SampleProducts';

const Home = () => {
    return (
        <div className='HOME' style={{
            minHeight: '100vh'
        }}>
            <Carousel />
            <Kelebihan />
            <SampleProducts />
        </div>
    );
}

export default Home;
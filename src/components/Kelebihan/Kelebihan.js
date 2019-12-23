import React from 'react';
import kopi from '../../assets/coffee.svg';
import rupiah from '../../assets/indonesian-rupiah.svg';
import quality from '../../assets/security.svg';
import shipped from '../../assets/shipped.svg';
import './Kelebihan.scss';

const Kelebihan = () => {

    const kelebihanItems = {
        satu: [
            {
                icon: shipped,
                title: 'FREE SHIPPING',
                body: 'ON ORDER OVER Rp50.000',
                bg: '#9d00b9'
            },
            {
                icon: kopi,
                title: 'ALWAYS FRESH',
                body: 'PRODUCT WELL PACKAGE',
                bg: '#0804ec'
            }
        ],
        dua: [
            {
                icon: quality,
                title: 'SUPERIOR QUALITY',
                body: 'QUALITY PRODUCTS',
                bg: '#9e0025'
            },
            {
                icon: rupiah,
                title: 'AFFORDABLE PRICE',
                body: 'CHEAP PRICE RICH TASTE',
                bg: '#9e2c00'
            }
        ]
    }
    return (
        <div className='kelebihan' style={{
            padding: '50px 0',
        }}>
            <div className='kelebihanContainer' style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-around',
                marginBottom: 25
            }}>
                {kelebihanItems.satu.map(item => (
                    <div key={item.title} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <img style={{
                            width: 80, height: 80,
                            backgroundColor: item.bg,
                            padding: 10, borderRadius: '50%', filter: 'invert(99%) sepia(0%) saturate(18%) hue-rotate(27deg) brightness(104%) contrast(100%)'
                        }} src={item.icon} alt="" />
                        <h3 style={{ fontWeight: 600, fontSize: 15, margin: '10px 0' }}>{item.title}</h3>
                        <p style={{ fontSize: 12 }}>{item.body}</p>
                    </div>
                ))}

            </div>

            <div className='kelebihanContainer' style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-around',
            }}>
                {kelebihanItems.dua.map(item => (
                    <div key={item.title} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <img style={{
                            width: 80, height: 80,
                            backgroundColor: item.bg,
                            padding: 10, borderRadius: '50%', filter: 'invert(99%) sepia(0%) saturate(18%) hue-rotate(27deg) brightness(104%) contrast(100%)'
                        }} src={item.icon} alt="" />
                        <h3 style={{ fontWeight: 600, fontSize: 15, margin: '10px 0' }}>{item.title}</h3>
                        <p style={{ fontSize: 12 }}>{item.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Kelebihan;
import React from 'react';
import { NavLink } from 'react-router-dom';
import call from '../../assets/call.svg';
import mail from '../../assets/mail.svg';
import location from '../../assets/location.svg';
import { Divider, BackTop } from 'antd';
import './Footer.scss';

const Footer = () => {

    const locationItems = [
        {
            icon: location,
            text: '203 Fake St. Mountain View, San Francisco, California, USA'
        }, {
            icon: call,
            text: '+2 392 3929 210'
        },
        {
            icon: mail,
            text: 'info@yourdomain.com'
        }
    ]
    return (
        <div className='Footer'>
            <Divider />
            <BackTop />

            <div className="infoFooter">
                <div className="slogans">
                    <h3>Lady Rose Coffee</h3>
                    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
                </div>

                <div className="quickLinks">
                    <h3>Quick Links</h3>

                    <div className="items">
                        <NavLink to='/Home'>Home</NavLink>
                        <NavLink to='/Shop'>Shop</NavLink>
                        <NavLink to='/About'>About</NavLink>
                        <NavLink to='/Contact'>Contact</NavLink>
                        <NavLink to='/Login'>Login</NavLink>
                    </div>
                </div>

                <div className="location">
                    <h3>Have a question?</h3>
                    {locationItems.map(item => (
                        <div key={item.text} className="locationItems">
                            <img src={item.icon} alt="" />
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
            <p className='cpr'>Copyright ©{new Date().getFullYear()} All rights reserved | NAMA</p>
        </div>
    );
}

export default Footer;
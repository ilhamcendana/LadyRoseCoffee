import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import call from '../../assets/call.svg';
import mail from '../../assets/mail.svg';
import location from '../../assets/location.svg';
import { Divider, BackTop, message } from 'antd';
import './Footer.scss';
import { useEffect } from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'

const Footer = () => {
    useEffect(() => {
        firebase.firestore().collection('systems').doc('footer').get()
            .then(snap => {
                setSlogan(snap.data().slogan)
            })
            .catch(err => {
                message.error(err.message)
            })

        firebase.firestore().collection('systems').doc('contact').get()
            .then(snap => {
                setlocations(snap.data().address)
                setcalls(snap.data().phone)
                setmails(snap.data().email)
            })
            .catch(err => {
                message.error(err.message)
            })
    }, [])

    const [locations, setlocations] = useState('')
    const [calls, setcalls] = useState('')
    const [mails, setmails] = useState('')

    const [slogan, setSlogan] = useState('Loading...')
    return (
        <div className='Footer'>
            <Divider />
            <BackTop />

            <div className="infoFooter">
                <div className="slogans">
                    <h3>Lady Rose Coffee</h3>
                    <p>{slogan}</p>
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
                    <div className="locationItems">
                        <img src={location} alt="" />
                        <p>{locations}</p>
                    </div>

                    <div className="locationItems">
                        <img src={call} alt="" />
                        <p>{calls}</p>
                    </div>

                    <div className="locationItems">
                        <img src={mail} alt="" />
                        <p>{mails}</p>
                    </div>


                </div>
            </div>
            <p className='cpr'>Copyright ©{new Date().getFullYear()} All rights reserved | NAMA</p>
        </div>
    );
}

export default Footer;
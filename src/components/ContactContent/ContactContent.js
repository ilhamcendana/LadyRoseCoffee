import React, { useState } from 'react';
import './ContactContent.scss';
import { Divider, Button, message } from 'antd';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { useEffect } from 'react';
import { connect } from 'react-redux';


const ContactContent = ({ isAuth, usersData }) => {
    useEffect(() => {
        firebase.firestore().collection('systems').doc('contact').get()
            .then(snap => {
                setCompanyInfo(snap.data())
            })
            .catch(err => {
                message.error(err.message)
            })
    }, [])


    //state
    const [yourName, setYourName] = useState('');
    const [yourEmail, setYourEmail] = useState(isAuth ? firebase.auth().currentUser.email : '');
    const [yourSubject, setYourSubject] = useState('');
    const [yourMessage, setYourMessage] = useState('');
    const [btnLoading, setbtnLoading] = useState(false)


    //variable
    const [companyInfo, setCompanyInfo] = useState
        ({
            address: '198 West 21th Street, Suite 721 New York NY 10016',
            phone: '+ 1235 2355 98',
            email: 'info@yoursite.com',
            website: 'yoursite.com'
        })

    const formInputs = [
        {
            placeholder: 'Your Name',
            value: yourName,
            onChange: e => setYourName(e),
        },
        {
            placeholder: 'Your Email',
            value: yourEmail,
            onChange: e => setYourEmail(e),
        },
        {
            placeholder: 'Subject',
            value: yourSubject,
            onChange: e => setYourSubject(e),
        },
    ]

    //func

    const submitForm = (e) => {
        e.preventDefault()

        if (yourName === '' || yourEmail === '' || yourSubject === '' || yourMessage === '') return message.warning('All field must be filled!')

        setbtnLoading(true)
        const ref = firebase.firestore().collection('messages').doc(`${yourEmail}-${new Date().getDay()}`)
        ref.get()
            .then(snap => {
                if (snap.exists) return message('You already sent a message')

                ref.set({
                    yourName, yourEmail, yourSubject, yourMessage
                })
                    .then(() => {
                        message.success('Message sent')
                        setYourName('')
                        setYourEmail('')
                        setYourSubject('')
                        setYourMessage('')
                        setbtnLoading(false)
                    })
                    .catch(err => {
                        message.warn(err.message)
                        setbtnLoading(false)
                    })
            })
    }

    return (
        <div className="ContactContent">
            <Divider orientation='center' className='dividDesk'>
                <h3 style={{ margin: 0 }}>Send us a message</h3>
            </Divider>

            <div className="companyInfo">
                <p>Address: <span>{companyInfo.address}</span></p>
                <p>Phone: <span>{companyInfo.phone}</span></p>
                <p>Email: <span>{companyInfo.email}</span></p>
                <p style={{ margin: 0 }}>Website: <span>{companyInfo.website}</span></p>
            </div>

            <Divider orientation='center' className='dividMob' >
                <h3 style={{ margin: 0 }}>Send us a message</h3>
            </Divider>

            <form onSubmit={submitForm}>
                {formInputs.map(item => (
                    <div key={item.placeholder} className="itemInput">
                        <label>{item.placeholder}</label>
                        <input disabled={isAuth && item.placeholder === 'Your Email' ? true : false} type="text" placeholder={item.placeholder} value={item.value} onChange={e => item.onChange(e.target.value)} />
                    </div>
                ))}
                <div className="itemInput">
                    <label>Message</label>
                    <textarea value={yourMessage} onChange={e => setYourMessage(e.target.value)} placeholder='Message'></textarea>
                </div>

                <Button loading={btnLoading} htmlType='submit' type='primary' shape='round'>Send</Button>
            </form>
        </div>
    );
}


const storeToProps = state => {
    return {
        isAuth: state.isAuth,
        usersData: state.usersData
    }
}

export default connect(storeToProps)(ContactContent);
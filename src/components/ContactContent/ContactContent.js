import React, { useState } from 'react';
import './ContactContent.scss';
import { Divider, Button } from 'antd';


const ContactContent = () => {
    //state
    const [yourName, setYourName] = useState('');
    const [yourEmail, setYourEmail] = useState('');
    const [yourSubject, setYourSubject] = useState('');
    const [yourMessage, setYourMessage] = useState('');


    //variable
    const companyInfo =
    {
        address: '198 West 21th Street, Suite 721 New York NY 10016',
        phone: '+ 1235 2355 98',
        email: 'info@yoursite.com',
        website: 'yoursite.com'
    }

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

            <form >
                {formInputs.map(item => (
                    <div key={item.placeholder} className="itemInput">
                        <label>{item.placeholder}</label>
                        <input type="text" placeholder={item.placeholder} value={item.value} onChange={e => item.onChange(e.target.value)} />
                    </div>
                ))}
                <div className="itemInput">
                    <label>Message</label>
                    <textarea placeholder='Message'></textarea>
                </div>

                <Button type='primary' shape='round'>Send</Button>
            </form>
        </div>
    );
}

export default ContactContent;
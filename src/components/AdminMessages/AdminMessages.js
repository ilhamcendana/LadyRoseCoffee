import React from 'react';
import './AdminMessages.scss'
import { Card, message } from 'antd';
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useEffect } from 'react';
import { useState } from 'react';

const AdminMessages = () => {
    useEffect(() => {
        firebase.firestore().collection('messages').get()
            .then(snap => {
                snap.forEach(child => {
                    setAllMessages(prev => {
                        let sample = [...prev]
                        sample.push(child.data())
                        return sample
                    })
                })
            })
            .catch(err => {
                message.error(err.message)
            })
    }, [])

    const [allMessages, setAllMessages] = useState([])
    console.log(allMessages)
    return (
        <div className='AdminMessages'>
            {allMessages.length < 1 && allMessages[0] !== 'Empty' ? <Card loading={true} style={{ width: '100%' }} /> : allMessages.map(item => (
                <Card title={`${item.yourName}`} bordered={false} style={{ width: 400 }}>
                    <h3>{item.yourEmail}</h3>
                    <p style={{ fontWeight: 'bold' }}>Subject:</p>
                    <p>{item.yourSubject}</p>
                    <p style={{ fontWeight: 'bold' }}>Message:</p>
                    <p>{item.yourMessage}</p>
                </Card>
            ))}
        </div>
    );
}

export default AdminMessages;
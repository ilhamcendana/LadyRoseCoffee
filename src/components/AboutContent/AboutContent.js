import React from 'react';
import { Button, message } from 'antd';
import { Link } from 'react-router-dom';
import './AboutContent.scss';
import { useEffect } from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useState } from 'react';

const AboutContent = ({ }) => {
    useEffect(() => {
        firebase.firestore().collection('systems').doc('about').get()
            .then(snap => {
                setTitle(snap.data().title)
                setbody1(snap.data().body1)
                setbody2(snap.data().body2)
            })
            .catch(err => {
                message.error(err.message)
            })
    }, [])


    const [title, setTitle] = useState('...')
    const [body1, setbody1] = useState('...')
    const [body2, setbody2] = useState('...')
    return (
        <div style={{
            padding: '35px 15px'
        }} className="AboutContent">
            <h3 style={{
                fontSize: '2.5em', fontWeight: 'bolder'
            }}>{title}</h3>
            <p>{body1}</p>
            <p>{body2}</p>
            <Link to='/Shop'>
                <Button shape='round' type='primary'>Shop Now</Button>
            </Link>
        </div>
    );
}

export default AboutContent;
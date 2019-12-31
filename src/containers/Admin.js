import React, { useState } from 'react';
import { message, Form } from 'antd';
import firebase from 'firebase/app';
import 'firebase/auth'
import { Icon } from 'antd'

const Admin = () => {
    const [pass, setPass] = useState('')
    const [loading, setloading] = useState(false)


    //func 
    const loginAdmin = (e) => {
        e.preventDefault();
        setloading(true)
        firebase.auth().signInWithEmailAndPassword('lrc@admin.com', pass)
            .then(() => {
                // window.location.pathname = '/admin/lady-rose-coffee'
                message.success('Hey Admin')
                setloading(false)
            })
            .catch((err) => {
                setloading(false)
                message.error(err.message)
            })
    }
    return (
        <div className="Admin">
            <div className="adminAuth" style={{
                width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
            }}>
                <h3 style={{ color: '#fff', fontWeight: 'bold' }}>Lady Rose Coffee Admin</h3>
                {loading ? <Icon type="loading" style={{ color: '#fff' }} /> :
                    <Form onSubmit={loginAdmin}>
                        <input style={{
                            width: '100%',
                            padding: '8px 5px', border: '1px solid #929292', borderRadius: 8
                        }} value={pass} onChange={e => setPass(e.target.value)} autoFocus={true} placeholder='Password' type='password' />
                    </Form>
                }
            </div>

            <div className="prevent" style={{ width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <h3 style={{ color: '#fff', fontSize: '1.5em', fontWeight: 'bold', textAlign: 'center' }}>You can't go to admin mode if you're on mobile</h3>
            </div>
        </div>
    );
}

export default Admin;


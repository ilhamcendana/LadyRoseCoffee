import React from 'react';
import './Login.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, message } from 'antd';
import { useState } from 'react';
import firebase from 'firebase/app'
import 'firebase/auth'


const Login = ({ loginFormChange, formLoginEmail, formLoginPassword }) => {
    const [btnLoading, setBtnLoading] = useState(false);

    //func
    const LOGIN = e => {
        e.preventDefault();
        if (formLoginEmail === '' || formLoginPassword === '') return message.warn('All fields must be filled!')
        setBtnLoading(true);
        firebase.auth().signInWithEmailAndPassword(formLoginEmail, formLoginPassword)
            .then(() => {
                message.loading('On proccess', .7)
                    .then(() => {
                        loginFormChange('formLoginEmail', '')
                        loginFormChange('formLoginPassword', '')
                        message.success(`Welcome and please wait a second!`, 1)
                            .then(() => window.location.pathname = '/')
                    })
            })
            .catch(err => {
                message.error(err.message)
            })
    }
    return (
        <div className="login">
            <h3>Welcome Back!</h3>
            <form onSubmit={LOGIN}>
                <input placeholder='Email'
                    name='formLoginEmail'
                    value={formLoginEmail}
                    onChange={e => loginFormChange(e.target.name, e.target.value)} type="email" />
                <input placeholder='Password'
                    name='formLoginPassword'
                    value={formLoginPassword}
                    onChange={e => loginFormChange(e.target.name, e.target.value)} type="password" />
                <Button loading={btnLoading} className='btnbtn' htmlType='submit' type='primary' >Login</Button>
            </form>

            <div className="forgotAndSignup">
                <Link className='forgot' to='/forgot-password'>Forgot your password?</Link>
                <p>Don't have an account?<Link to='/auth/sign-up'> Get Started</Link></p>
            </div>
        </div>
    );
}

const storeToProps = (state) => {
    return {
        formLoginEmail: state.formLoginEmail,
        formLoginPassword: state.formLoginPassword
    }
}

const dispatchFromStore = (dispatch) => {
    return {
        loginFormChange: (formLoginName, formLoginValue) => dispatch({ type: 'loginFormChange', formLoginName, formLoginValue })
    }
}

export default connect(storeToProps, dispatchFromStore)(Login);
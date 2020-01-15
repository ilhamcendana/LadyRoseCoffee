import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.scss';
import { Button, message } from 'antd';
import { connect } from 'react-redux';
import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


const SignUp = ({ signUpFormChange, formSignUpEmail, formSignUpPassword, formSignUpName }) => {
    const [btnLoading, setBtnLoading] = useState(false);

    const SIGNUP = e => {
        e.preventDefault();
        if (formSignUpEmail === '' || formSignUpPassword === '' || formSignUpName === '') return message.warn('All fields must be filled!')
        setBtnLoading(true);

        firebase.auth().createUserWithEmailAndPassword(formSignUpEmail, formSignUpPassword)
            .then(user => {
                firebase.firestore().collection('users').doc(user.user.uid)
                    .set({
                        nama: formSignUpName,
                        cart: [],
                    }, { merge: true })
                    .then(() => {
                        setBtnLoading(false);
                        signUpFormChange('formSignUpName', '');
                        signUpFormChange('formSignUpEmail', '');
                        signUpFormChange('formSignUpPassword', '');
                    })
            })
            .catch(err => {
                message.error(err.message)
                setBtnLoading(false);
            })
    }
    return (
        <div className="sign-up">
            <h3>Register!</h3>
            <form onSubmit={SIGNUP}>
                <input
                    value={formSignUpName}
                    name='formSignUpName'
                    onChange={e => signUpFormChange(e.target.name, e.target.value)}
                    placeholder='Full Name' type="text" />
                <input
                    value={formSignUpEmail}
                    name='formSignUpEmail'
                    onChange={e => signUpFormChange(e.target.name, e.target.value)}
                    placeholder='Email' type="email" />
                <input
                    value={formSignUpPassword}
                    name='formSignUpPassword'
                    onChange={e => signUpFormChange(e.target.name, e.target.value)}
                    placeholder='Password' type="password" />
                <Button className='btnbtn' type='primary' htmlType='submit' loading={btnLoading} >Register</Button>
            </form>

            <div className="forgotAndSignup">
                <p>Already have an account? <Link to='/auth/login'> Login</Link></p>
            </div>
        </div>
    );
}

const storeToProps = (state) => {
    return {
        formSignUpEmail: state.formSignUpEmail,
        formSignUpPassword: state.formSignUpPassword,
        formSignUpName: state.formSignUpName
    }
}

const dispatchFromStore = (dispatch) => {
    return {
        signUpFormChange: (formSignUpName, formSignUpValue) => dispatch({ type: 'signUpFormChange', formSignUpName, formSignUpValue }),

    }
}

export default connect(storeToProps, dispatchFromStore)(SignUp);
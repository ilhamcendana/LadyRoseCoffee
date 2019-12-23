import React from 'react';
import Login from '../components/Login/Login';
import { Route } from 'react-router-dom';
import SignUp from '../components/SignUp/SignUp';

const Authentication = () => {
    return (
        <div className='Authentication'>
            <Route exact path='/auth/login' component={Login} />
            <Route exact path='/auth/sign-up' component={SignUp} />
        </div>
    );
}

export default Authentication;
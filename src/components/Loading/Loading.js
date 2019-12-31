import React from 'react';
import { Icon } from 'antd';
import './Loading.scss';

const Loading = () => {
    return (
        <div className="Loading">
            <Icon className='loadingIcon' type='coffee' />
            <p>Lady Rose Loading...</p>
        </div>
    );
}

export default Loading;
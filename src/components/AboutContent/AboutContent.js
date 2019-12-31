import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './AboutContent.scss';

const AboutContent = ({ title, body1, body2 }) => {
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
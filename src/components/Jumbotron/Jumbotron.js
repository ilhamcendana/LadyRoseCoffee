import React from 'react';
import './Jumbotron.scss';

const Jumbotron = ({ jmbBG, jmbText }) => {
    return (
        <div style={{
            backgroundImage: `url(${jmbBG})`
        }} className="Jumbotron">
            <h3>{jmbText}</h3>
        </div>
    );
}

export default Jumbotron;
import React from 'react';
import Jumbotron from '../components/Jumbotron/Jumbotron';
import ContactContent from '../components/ContactContent/ContactContent';

const Contact = () => {
    return (
        <div className="Contact">
            <Jumbotron jmbText='CONTACT US' jmbBG='https://i1.wp.com/farmershares.com/wp-content/uploads/2019/06/beverage-1840426_1920.jpg?ssl=1' />

            <ContactContent />
        </div>
    );
}

export default Contact;
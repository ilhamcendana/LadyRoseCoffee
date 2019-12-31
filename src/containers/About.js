import React from 'react';
import Jumbotron from '../components/Jumbotron/Jumbotron';
import AboutContent from '../components/AboutContent/AboutContent';
import Kelebihan from '../components/Kelebihan/Kelebihan';

const About = () => {
    return (
        <div className="About">
            <Jumbotron jmbText='ABOUT US' jmbBG='https://i1.wp.com/farmershares.com/wp-content/uploads/2019/06/beverage-1840426_1920.jpg?ssl=1' />
            <AboutContent title='Vegefoods an eCommerce website' body1='Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.'
                body2='But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.' />
            <Kelebihan />
        </div>
    );
}

export default About;
import React from 'react';
import { Icon } from 'antd';
import './Navbar.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';


const Navbar = () => {

    useEffect(() => {
        checkingScrollPos()
    }, []);

    //state
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isDropdownOpenWhite, setIsDropdownOpenWhite] = useState(false)
    const [scrollPos, setScrollPos] = useState(window.scrollY);

    //variable
    const NavLinks = [
        {
            title: 'HOME',
            url: '/'
        },
        {
            title: 'SHOP',
            url: '/Shop'
        },
        {
            title: 'ABOUT',
            url: '/About'
        },
        {
            title: 'CONTACT',
            url: '/Contact'
        },
        {
            title: 'LOGIN',
            url: '/auth/login'
        }
    ]

    //func 
    const checkingScrollPos = () => {
        window.addEventListener('scroll', () => {
            setScrollPos(window.scrollY)
            if (window.scrollY > 80) {
                setIsDropdownOpen(prev => prev ? false : prev)
            } else {
                setIsDropdownOpenWhite(prev => prev ? false : prev)
            }
        })
    }

    const backToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        setIsDropdownOpen(false)
        setIsDropdownOpenWhite(false)
    }
    return (
        <div className='Navbar'>
            <div className="bottomNavbar">
                <h1 className="brandName">Lady Rose Coffee</h1>

                <div className="menuButton" onClick={() => setIsDropdownOpen(prev => !prev)}>
                    <Icon type="menu" style={{ color: '#929292' }} />
                    <h1>MENU</h1>
                </div>

                <div className="desktop-nav">
                    {NavLinks.map(item => (
                        <NavLink onClick={backToTop} exact activeClassName='aktif' key={item.title} to={item.url}>{item.title}</NavLink>
                    ))}

                    <NavLink to='/cart' className="cart">
                        <Icon type='shopping-cart' />
                        <p>0</p>
                    </NavLink>
                </div>
            </div>

            <div style={{ top: scrollPos > 80 ? 0 : -80 }} className="bottomNavbarWhite">
                <h1 className="brandName">Lady Rose Coffee</h1>

                <div className="menuButton" onClick={() => setIsDropdownOpenWhite(prev => !prev)}>
                    <Icon type="menu" style={{ color: '#000' }} />
                    <h1>MENU</h1>
                </div>

                <div className="desktop-nav-white">
                    {NavLinks.map(item => (
                        <NavLink onClick={backToTop} exact activeClassName='aktif' key={item.title} to={item.url}>{item.title}</NavLink>
                    ))}

                    <NavLink to='/cart' className="cart">
                        <Icon type='shopping-cart' />
                        <p>0</p>
                    </NavLink>
                </div>
            </div>

            <div style={{ height: isDropdownOpen ? 290 : 0, padding: isDropdownOpen ? 15 : 0 }} className="mobile-dropdown-nav">
                {NavLinks.map(item => (
                    <NavLink onClick={backToTop} exact activeClassName='aktif' key={item.title} to={item.url}>{item.title}</NavLink>
                ))}
                <NavLink to='/cart' className="cart">
                    <Icon type='shopping-cart' />
                    <p>0</p>
                </NavLink>
            </div>

            <div style={{ height: isDropdownOpenWhite ? 290 : 0, padding: isDropdownOpenWhite ? 15 : 0 }} className="mobile-dropdown-nav-white">
                {NavLinks.map(item => (
                    <NavLink onClick={backToTop} exact activeClassName='aktif' key={item.title} to={item.url}>{item.title}</NavLink>
                ))}
                <NavLink to='/cart' className="cart">
                    <Icon type='shopping-cart' />
                    <p>0</p>
                </NavLink>
            </div>
        </div>
    );
}

export default Navbar;
import React from 'react';
import { Icon, Popover, Popconfirm, Button, message } from 'antd';
import './Navbar.scss';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth'


const Navbar = ({ isAuth, usersData, cleanUsersData, cartTotal }) => {

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

    const NavLinksAuth = [
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
            title: `Hi, ${usersData.nama !== undefined ? usersData.nama.toUpperCase() : ''}`,
            url: `/user/${usersData.nama !== undefined ? usersData.nama : ''}`,
            user: 'user'
        }
    ]

    const content = (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Link style={{
                padding: 10,
            }} to='/order'>My Order</Link>
            <Popconfirm title='Sure want to logout?' onConfirm={() => {
                firebase.auth().signOut()
                    .then(() => {
                        cleanUsersData()
                        window.location.pathname = '/'
                    })
            }}>
                <Button type='danger'>Logout</Button>
            </Popconfirm>
        </div>
    )

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
                    {!isAuth ? NavLinks.map(item =>
                        <NavLink onClick={backToTop} exact activeClassName='aktif' key={item.title} to={item.url}>{item.title}</NavLink>
                    ) : NavLinksAuth.map(item =>
                        item.user === 'user' ?
                            <Popover key={item.title} placement="bottom" content={content} trigger="click">
                                <p className='userNameee'>{item.title}</p>
                            </Popover>
                            : <NavLink onClick={backToTop} exact activeClassName='aktif' key={item.title} to={item.url}>{item.title}</NavLink>
                    )}

                    {isAuth ?
                        <NavLink to='/cart' className="cart">
                            <Icon type='shopping-cart' />
                            <p>{cartTotal}</p>
                        </NavLink> :
                        <div onClick={() => message.warn('Please sign in to see your cart')} className="wkwk">
                            <Icon type='shopping-cart' />
                            <p>{cartTotal}</p>
                        </div>}
                </div>
            </div>

            <div style={{ top: scrollPos > 80 ? 0 : -80 }} className="bottomNavbarWhite">
                <h1 className="brandName">Lady Rose Coffee</h1>

                <div className="menuButton" onClick={() => setIsDropdownOpenWhite(prev => !prev)}>
                    <Icon type="menu" style={{ color: '#000' }} />
                    <h1>MENU</h1>
                </div>

                <div className="desktop-nav-white">
                    {!isAuth ?
                        NavLinks.map(item => (
                            <NavLink onClick={backToTop} exact activeClassName='aktif' key={item.title} to={item.url}>{item.title}</NavLink>
                        )) :
                        NavLinksAuth.map(item =>
                            item.user === 'user' ?
                                <Popover key={item.title} placement="bottom" content={content} trigger="click">
                                    <p className='userNameee'>{item.title}</p>
                                </Popover>
                                : <NavLink onClick={backToTop} exact activeClassName='aktif' key={item.title} to={item.url}>{item.title}</NavLink>
                        )}

                    {isAuth ?
                        <NavLink to='/cart' className="cart">
                            <Icon type='shopping-cart' />
                            <p>{cartTotal}</p>
                        </NavLink> :
                        <div onClick={() => message.warn('Please sign in to see your cart')} className="wkwk">
                            <Icon type='shopping-cart' />
                            <p>{cartTotal}</p>
                        </div>}
                </div>
            </div>

            <div style={{ height: isDropdownOpen ? 290 : 0, padding: isDropdownOpen ? 15 : 0 }} className="mobile-dropdown-nav">
                {!isAuth ? NavLinks.map(item => (
                    <NavLink onClick={backToTop} exact activeClassName='aktif' key={item.title} to={item.url}>{item.title}</NavLink>
                )) :
                    NavLinksAuth.map(item =>
                        item.user === 'user' ?
                            <Popover key={item.title} placement="bottom" content={content} trigger="click">
                                <p className='userNameee'>{item.title}</p>
                            </Popover>
                            : <NavLink onClick={backToTop} exact activeClassName='aktif' key={item.title} to={item.url}>{item.title}</NavLink>)}
                {isAuth ?
                    <NavLink to='/cart' className="cart">
                        <Icon type='shopping-cart' />
                        <p>{cartTotal}</p>
                    </NavLink> :
                    <div onClick={() => message.warn('Please sign in to see your cart')} className="wkwk">
                        <Icon type='shopping-cart' />
                        <p>{cartTotal}</p>
                    </div>}
            </div>

            <div style={{ height: isDropdownOpenWhite ? 290 : 0, padding: isDropdownOpenWhite ? 15 : 0 }} className="mobile-dropdown-nav-white">
                {!isAuth ? NavLinks.map(item => (
                    <NavLink onClick={backToTop} exact activeClassName='aktif' key={item.title} to={item.url}>{item.title}</NavLink>
                ))
                    :
                    NavLinksAuth.map(item =>
                        item.user === 'user' ?
                            <Popover key={item.title} placement="bottom" content={content} trigger="click">
                                <p className='userNameee'>{item.title}</p>
                            </Popover>
                            : <NavLink onClick={backToTop} exact activeClassName='aktif' key={item.title} to={item.url}>{item.title}</NavLink>)}

                {isAuth ?
                    <NavLink to='/cart' className="cart">
                        <Icon type='shopping-cart' />
                        <p>{cartTotal}</p>
                    </NavLink> :
                    <div onClick={() => message.warn('Please sign in to see your cart')} className="wkwk">
                        <Icon type='shopping-cart' />
                        <p>{cartTotal}</p>
                    </div>}
            </div>
        </div>
    );
}

const storeToProps = state => {
    return {
        isAuth: state.isAuth,
        usersData: state.usersData,
        cartTotal: state.cartTotal
    }
}

const disptachToStore = disptach => {
    return {
        cleanUsersData: () => disptach({ type: 'cleanUsersData' })
    }
}

export default connect(storeToProps, disptachToStore)(Navbar);
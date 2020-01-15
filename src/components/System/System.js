import React from 'react';
import './System.scss'
import { Input, message, Button, Icon } from 'antd';
import { useEffect } from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useState } from 'react';

const System = () => {
    useEffect(() => {
        getSystems()
    }, [])
    const [loadingSaveBtn, setloadingSaveBtn] = useState(false)
    const [home, setHome] = useState('')
    const [about1, setAbout1] = useState('')
    const [about2, setAbout2] = useState('')
    const [about3, setAbout3] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setphone] = useState('')
    const [email, setemail] = useState('')
    const [website, setwebsite] = useState('')
    const [footer, setFooter] = useState('')
    const [editable, setEditable] = useState({
        show: false, name: ''
    })

    const homeItem = {
        page: 'home',
        text: 'Get your coffee text',
        theText: home,
        value: home,
        onChange: e => setHome(e)
    }

    const aboutItem = {
        page: 'about',
        text: 'Title and 2 body text',
        theText1: about1,
        theText2: about2,
        theText3: about3,
        value1: about1,
        value2: about2,
        value3: about3,
        onChange1: e => setAbout1(e),
        onChange2: e => setAbout2(e),
        onChange3: e => setAbout3(e)
    }

    const contactItem = {
        page: 'contact',
        text: 'address, email, phone, website',
        address: address,
        phone: phone,
        email: email,
        website: website,
        onChangeAddress: e => setAddress(e),
        onChangePhone: e => setphone(e),
        onChangeEmail: e => setemail(e),
        onChangeWebsite: e => setwebsite(e)
    }

    const footerItem = {
        page: 'footer',
        text: 'slogan',
        onChange: e => setFooter(e)
    }


    const getSystems = () => {
        const docName = ['home', 'about', 'contact', 'footer']
        for (let i = 0; i < docName.length; i++) {
            const ref = firebase.firestore().collection('systems')
            switch (docName[i]) {
                case 'home':
                    ref.doc('home').get().then(snap => {
                        setHome(snap.data().getYourCoffee)
                    })
                        .catch(err => {
                            message.error(err.message)
                        })
                    break;
                case 'about':
                    ref.doc('about').get().then(snap => {
                        setAbout1(snap.data().title)
                        setAbout2(snap.data().body1)
                        setAbout3(snap.data().body2)
                    })
                        .catch(err => {
                            message.error(err.message)
                        })
                    break;

                case 'contact':
                    ref.doc('contact').get().then(snap => {
                        const { address, phone, email, website } = snap.data()
                        setAddress(address)
                        setphone(phone)
                        setemail(email)
                        setwebsite(website)
                    })
                        .catch(err => {
                            message.error(err.message)
                        })
                    break;

                case 'footer':
                    ref.doc('footer').get().then(snap => {
                        setFooter(snap.data().slogan)
                    })
                        .catch(err => {
                            message.error(err.message)
                        })
                    break;


                default:
                    break;
            }
        }
    }


    const saveEdit = (docName) => {
        setloadingSaveBtn(true)
        const ref = firebase.firestore().collection('systems').doc(docName)
        switch (docName) {
            case "home":
                message.loading('Saving...')
                    .then(() => {
                        ref.set({
                            getYourCoffee: home
                        }, { merge: true })
                            .then(() => {
                                getSystems()
                                message.success('Edit saved!!')
                                setEditable({ show: false, name: '' })
                                setloadingSaveBtn(false)
                            })
                            .catch(err => {
                                message.error(err.message)
                            })
                    })
                break;

            case "about":
                message.loading('Saving...')
                    .then(() => {
                        ref.set({
                            title: about1, body1: about2, body2: about3
                        }, { merge: true })
                            .then(() => {
                                getSystems()
                                message.success('Edit saved!!')
                                setEditable({ show: false, name: '' })
                                setloadingSaveBtn(false)
                            })
                            .catch(err => {
                                message.error(err.message)
                            })
                    })
                break;

            case "contact":
                message.loading('Saving...')
                    .then(() => {
                        ref.set({
                            address, phone, email, website
                        }, { merge: true })
                            .then(() => {
                                getSystems()
                                message.success('Edit saved!!')
                                setEditable({ show: false, name: '' })
                                setloadingSaveBtn(false)
                            })
                            .catch(err => {
                                message.error(err.message)
                            })
                    })
                break;

            case "footer":
                message.loading('Saving...')
                    .then(() => {
                        ref.set({
                            slogan: footer
                        }, { merge: true })
                            .then(() => {
                                getSystems()
                                message.success('Edit saved!!')
                                setEditable({ show: false, name: '' })
                                setloadingSaveBtn(false)
                            })
                            .catch(err => {
                                message.error(err.message)
                            })
                    })
                break;

            default:
                break;
        }
    }


    return (
        <div className="System">
            <div className="itemn">
                <h1>{homeItem.page.toUpperCase()}</h1>
                <p className='subTitle'>{homeItem.text}</p>
                {editable.show && editable.name === homeItem.page ? <Input value={home} onChange={e => homeItem.onChange(e.target.value)} /> : <p>{home}</p>}
                {editable.show && editable.name === homeItem.page ?
                    <div>
                        <Button type='primary' loading={loadingSaveBtn} icon='save' onClick={() => saveEdit(homeItem.page)}>Save</Button>
                        <Button onClick={() => setEditable({ show: false, name: '' })} type='danger' icon='close-circle'>Cancel</Button>
                    </div>
                    : <Button onClick={() => setEditable({ show: true, name: homeItem.page })} icon='edit' shape='round' type='primary'>Edit</Button>}
            </div>

            <div className="itemn">
                <h1>{aboutItem.page.toUpperCase()}</h1>
                <p className='subTitle'>{aboutItem.text}</p>
                {editable.show && editable.name === aboutItem.page ?
                    <>
                        <Input value={about1} onChange={e => aboutItem.onChange1(e.target.value)} />
                        <Input value={about2} onChange={e => aboutItem.onChange2(e.target.value)} />
                        <Input value={about3} onChange={e => aboutItem.onChange3(e.target.value)} />
                    </> :
                    <>
                        <p><span>Title:</span> {about1}</p>
                        <p><span>Body1:</span> {about2}</p>
                        <p><span>Body2:</span> {about3}</p>
                    </>}
                {editable.show && editable.name === aboutItem.page ?
                    <div>
                        <Button onClick={() => saveEdit(aboutItem.page)} type='primary' loading={loadingSaveBtn} icon='save'>Save</Button>
                        <Button onClick={() => setEditable({ show: false, name: '' })} type='danger' icon='close-circle'>Cancel</Button>
                    </div>
                    : <Button onClick={() => setEditable({ show: true, name: aboutItem.page })} icon='edit' shape='round' type='primary'>Edit</Button>}
            </div>


            <div className="itemn">
                <h1>{contactItem.page.toUpperCase()}</h1>
                <p className='subTitle'>{contactItem.text}</p>
                {editable.show && editable.name === contactItem.page ?
                    <>
                        <Input value={address} onChange={e => contactItem.onChangeAddress(e.target.value)} />
                        <Input value={phone} onChange={e => contactItem.onChangePhone(e.target.value)} />
                        <Input value={email} onChange={e => contactItem.onChangeEmail(e.target.value)} />
                        <Input value={website} onChange={e => contactItem.onChangeWebsite(e.target.value)} />
                    </> :
                    <>
                        <p><span>Address:</span> {address}</p>
                        <p><span>Phone:</span> {phone}</p>
                        <p><span>Email:</span> {email}</p>
                        <p><span>Website:</span> {website}</p>
                    </>}
                {editable.show && editable.name === contactItem.page ?
                    <div>
                        <Button onClick={() => saveEdit(contactItem.page)} type='primary' loading={loadingSaveBtn} icon='save'>Save</Button>
                        <Button onClick={() => setEditable({ show: false, name: '' })} type='danger' icon='close-circle'>Cancel</Button>
                    </div>
                    : <Button onClick={() => setEditable({ show: true, name: contactItem.page })} icon='edit' shape='round' type='primary'>Edit</Button>}
            </div>


            <div className="itemn">
                <h1>{footerItem.page.toUpperCase()}</h1>
                <p className='subTitle'>{footerItem.text}</p>
                {editable.show && editable.name === footerItem.page ? <Input value={footer} onChange={e => footerItem.onChange(e.target.value)} /> : <p>{footer}</p>}
                {editable.show && editable.name === footerItem.page ?
                    <div>
                        <Button type='primary' loading={loadingSaveBtn} icon='save' onClick={() => saveEdit(footerItem.page)}>Save</Button>
                        <Button onClick={() => setEditable({ show: false, name: '' })} type='danger' icon='close-circle'>Cancel</Button>
                    </div>
                    : <Button onClick={() => setEditable({ show: true, name: footerItem.page })} icon='edit' shape='round' type='primary'>Edit</Button>}
            </div>
        </div>
    );
}

export default System;
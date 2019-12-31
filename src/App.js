import React, { useEffect, useState } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import firebase from './API'
import 'firebase/auth';
import 'firebase/firestore';

// comp
import Navbar from './components/Navbar/Navbar';
import Home from './containers/Home';
import Footer from './components/Footer/Footer';
import Authentication from './containers/Authentication';
import About from './containers/About';
import Contact from './containers/Contact';
import Loading from './components/Loading/Loading';
import Admin from './containers/Admin';
import AdminPage from './containers/AdminPage';
import Shop from './containers/Shop';
import Cart from './containers/Cart';




const App = ({ isReady, setIsReady, setIsAuth, isAuth, setUsersData, cariTotalCart }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsReady(true)
        setIsAuth(true)
        getUsersData()
      } else {
        setIsReady(true)
        setIsAuth(false)
      }
    })
    gotoAdmin()
  }, [])

  //state 
  const [tampung, setTampung] = useState('');

  //func
  const getUsersData = () => {
    const uid = firebase.auth().currentUser.uid
    firebase.firestore().collection('users').doc(uid).get()
      .then(snap => {
        setUsersData(snap.data())
        if (uid !== '3ibysZzdBbNaaLOr66Ay63NJC8f1') cariTotalCart()
      })
  }

  const gotoAdmin = () => {
    window.addEventListener('keypress', e => {
      setTampung(prev => prev.concat(e.key));
      setTimeout(() => {
        setTampung('')
      }, 2000);
    })
  }

  return (
    <Router>
      {isReady ? isAuth && firebase.auth().currentUser.uid === '3ibysZzdBbNaaLOr66Ay63NJC8f1' ?
        <>
          <Redirect to='/admin/lady-rose-coffee' />
          <Route render={() => <AdminPage />} path='/admin/lady-rose-coffee' />
        </> :
        <div className="App">
          {tampung === 'gotoadminEnter' ? <Redirect to='/admin/' /> : null}
          <Route path='/admin/' render={() => <Admin />} />

          {window.location.pathname === '/admin/lady-rose-coffee' || window.location.pathname === '/admin/' ? null : <Navbar />}
          <Route exact path='/' render={() => <Home />} />
          <Route exact path='/Shop' render={() => <Shop />} />
          {isAuth ? <Route exact path='/cart' render={() => <Cart />} /> : null}
          {isAuth ? null : <Route path='/auth/' render={() => <Authentication />} />}
          <Route exact path='/About' render={() => <About />} />
          <Route exact path='/Contact' render={() => <Contact />} />
          {window.location.pathname === '/admin/lady-rose-coffee' || window.location.pathname === '/admin/' ? null : <Footer />}
        </div>
        :
        <Loading />
      }
    </Router>
  );
}

const stateToProps = state => {
  return {
    isReady: state.isReady,
    isAuth: state.isAuth
  }
}

const dispatchToStore = dispatch => {
  return {
    setIsReady: (readyCondition) => dispatch({ type: 'setIsReady', readyCondition }),
    setIsAuth: (authCondition) => dispatch({ type: 'setIsAuth', authCondition }),
    setUsersData: (data) => dispatch({ type: 'setUsersData', data }),
    cariTotalCart: () => dispatch({ type: 'cariTotalCart' })
  }
}

export default connect(stateToProps, dispatchToStore)(App);

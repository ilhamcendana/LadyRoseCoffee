import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// comp
import Navbar from './components/Navbar/Navbar';
import Home from './containers/Home';
import Footer from './components/Footer/Footer';
import Authentication from './containers/Authentication';


const App = ({ cendana }) => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path='/' render={() => <Home />} />
        <Route path='/auth/' render={() => <Authentication />} />
        <Footer />
      </div>
    </Router>
  );
}

const stateToProps = state => {
  return {
    cendana: state.test
  }
}

export default connect(stateToProps)(App);

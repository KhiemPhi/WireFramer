import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import './css/fonts/Lexend Exa/css.css';
import Navbar from './components/navbar/Navbar.js';
import RegisterScreen from './components/register_screen/RegisterScreen.js';
import LoginScreen from './components/login_screen/LoginScreen.js';
import HomeScreen from './components/home_screen/HomeScreen.js';
import EditScreen from './components/list_screen/EditScreen.js';
import DatabaseTester from './test/DatabaseTester'


class App extends Component {
  render() {
    const { auth } = this.props;

    // if auth is loaded then we render App.
    // But if not then we doesn't render the one.
    // Item Screen Route Before ListScren Route

    if (auth.isLoaded) {
      return (
        <BrowserRouter>
          <div className="App grey lighten-2">
            <Navbar />
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route path="/databaseTester" component={DatabaseTester} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/login" component={LoginScreen} />              
              <Route path="/WireFrame/:id" component={EditScreen} />
              <Route path="/:any" component={HomeScreen} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(App);
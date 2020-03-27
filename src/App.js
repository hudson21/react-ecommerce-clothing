import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

// Componetns
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

// Firebase
import { auth } from './firebase/firebase.utils';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      currentUser: null
    }
  }

  unSubscribeFromAuth = null;

  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user })
      console.log('user', user);
    })
  }

  // Closing the Subscription to the firebase auth method
  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }

  render() {
    
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage}/>
          <Route exact path="/signin" component={SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;

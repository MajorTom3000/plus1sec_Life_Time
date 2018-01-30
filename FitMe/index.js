import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  ActivityIndicator
} from 'react-native';
import Login from './src/pages/Login';
import Account from './src/pages/Account';
import styles from './src/styles/baseStyles.js';
//import App from './App';
import * as firebase from 'firebase';
import NavigationExperimental from 'react-native-deprecated-custom-components';

const firebaseConfig = {
  apiKey: "AIzaSyBTnIxRltmJxEHERmz3epT40wGwLUH3jJU",
  authDomain: "cs125awesomeproject.firebaseapp.com",
  databaseURL: "https://cs125awesomeproject.firebaseio.com",
  storageBucket: "gs://cs125awesomeproject.appspot.com",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

class FitMe extends Component {
  constructor(props){
    super(props);
    this.state = {
      // the page is the screen we want to show the user, we will determine that
      // based on what user the firebase api returns to us.
      page: null
    };
  }

  componentWillMount(){
    // We must asynchronously get the auth state, if we use currentUser here, it'll be null
    const unsubscribe = firebaseApp.auth().onAuthStateChanged((user) => {
      // If the user is logged in take them to the accounts screen
      if (user != null) {
        this.setState({page: Account});
        return;
      }
      // otherwise have them login
      this.setState({page: Login});
      // unsubscribe this observer
      unsubscribe();
    });
  }

  render() {
    if (this.state.page) {
      return (
        // Take the user to whatever page we set the state to.
        // We will use a transition where the new page will slide in from the right.
        <NavigationExperimental.Navigator
          initialRoute={{component: this.state.page}}
          configureScene={() => {
            return NavigationExperimental.Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            if(route.component){
              // Pass the navigator the the page so it can navigate as well.
              // Pass firebaseApp so it can make calls to firebase.
              return React.createElement(route.component, { navigator, firebaseApp});
            }
        }} />
      );
    } else {
      return (
        // Our default loading view while waiting to hear back from firebase
        <View style={styles.container}>
          <ToolbarAndroid title="RN Firebase Auth" />
          <View style={styles.body}>
            <ActivityIndicator size="large" />
          </View>
        </View>
      );
    }
  }
}

AppRegistry.registerComponent('FitMe', () => FitMe);

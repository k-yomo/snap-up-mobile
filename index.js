import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBrmEDw2473a4aG53WSura1XJQpOh-eKoE",
    authDomain: "snap-up.firebaseapp.com",
    databaseURL: "https://snap-up.firebaseio.com",
    projectId: "snap-up",
    storageBucket: "",
    messagingSenderId: "754203017870"
  };
  firebase.initializeApp(config);

AppRegistry.registerComponent('mobile', () => App);

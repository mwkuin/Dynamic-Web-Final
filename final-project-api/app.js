//import express
const express = require('express');
const app = express();

const port = process.env.PORT || 4000;

//require firebase
const firebase = require("firebase");
//Config
const firebaseConfig = {
    apiKey: "AIzaSyCLBJ4w65_RjpE54Sq9ujOtlBRVFIeG6AY",
    authDomain: "final-project-37ede.firebaseapp.com",
    databaseURL: "https://final-project-37ede.firebaseio.com",
    projectId: "final-project-37ede",
    storageBucket: "final-project-37ede.appspot.com",
    messagingSenderId: "200354381478",
    appId: "1:200354381478:web:9450e6350274fc268f3e67"
  };

//initial firebase
firebase.initializeApp(firebaseConfig);


const indexRoute = require('./routes/index.js');
const singlePostRoute = require('./routes/singlePost.js');
const createPostRoute = require('./routes/createPost.js');


//serve static files
app.use('/static', express.static('public'));

// //routing in express
app.use('/', indexRoute);
app.use('/post', singlePostRoute);
app.use('/create', createPostRoute);

// app.get('/', (req,res) => res.send("Hello World"));
app.listen(port, () => console.log('Final Project API is running!'));

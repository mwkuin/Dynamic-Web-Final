import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import * as firebase from 'firebase/app';
import "firebase/auth";

//Pages
import CreateAccount from "./pages/CreateAccount";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";


//Styles
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

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

    //ensure app is initialized when it is ready to be
    useEffect(() => {
      //ensure app is not initialized more than once
      //is firebase already initialized?
      if(!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
    //Setting auth to be persistent in SESSION storage, not cookies
    //You can also use cookies with firebase but we're using session
    //because it is easier to work with
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .catch(function(e) {
        console.log('AUTH ERROR', e);
      });
    }, [firebaseConfig]);


    //Check to see if user is logged in
    //User loads page, check status -> set state accordingly
    useEffect(() => {
      firebase.auth().onAuthStateChanged(function (user) {
      if(user) {
        //Logged in
        setUserInfo(user);
        setLoggedIn(true);
      } else {
        //Not logged in
        setUserInfo({});
        setLoggedIn(false);
      }
        setLoading(false);
      });
      }, []);

      //Login
      function LoginFunction(e) {
        e.preventDefault();
        let email = e.currentTarget.loginEmail.value;
        let password = e.currentTarget.loginPassword.value;

        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function(response) {
          console.log("LOGIN RESPONSE", response);
          setLoggedIn(true);
        })
        .catch(function(error) {
          console.log("LOGIN ERROR", error)
        });
      }

      //Logout
      function LogoutFunction() {
        firebase
          .auth()
          .signOut()
          .then(function() {
            setLoggedIn(false);
          })
          .catch(function(error) {
            console.log("LOGOUT ERROR", error);
          });
      }

      function CreateAccountFunction(e) {
        e.preventDefault();
        console.log('form payload', e);

        //default values for testing
        let email = e.currentTarget.createEmail.value;
        let password = e.currentTarget.createPassword.value;


        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(function(response) {
            console.log('VALID ACCOUNT CREATE', response);
            setLoggedIn(true);
          })
          .catch(function(e) {
            console.log("CREATE ACCOUNT ERROR", e);
          });

      }
      if (loading) return null;

  return (
    <div className="App">
      <Header LogoutFunction={LogoutFunction} isLoggedIn={loggedIn}/>
      <Router>
        <Route exact path="/">
          {!loggedIn ? (<Redirect to="/login"/> ) : (<Home userInfo={userInfo}/>)}
        </Route>
        <Route exact path="/post/:id">
          {!loggedIn ? (<Redirect to="/login"/> ) : (<SinglePost/>)}
        </Route>
        <Route exact path="/login">
          {!loggedIn ? (<Login LoginFunction={LoginFunction}/> ) : (<Redirect to="/"/>)}
        </Route>

        <Route exact path="/create-account">
          {!loggedIn ? (<CreateAccount CreateAccountFunction={CreateAccountFunction} />) : (<Redirect to="/" />)}
        </Route>
      </Router>



    </div>
  );
}

export default App;

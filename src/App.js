import React, { useState } from 'react';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photoUrl: ''
  })

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignin = () => {
    firebase.auth().signInWithPopup(provider)
      .then((res) => {
        const { displayName, email, photoUrl } = res.user;
        const isSignedUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoUrl
        }
        setUser(isSignedUser);
        // console.log(displayName, email, photoUrl);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      })
  }
  const handleSignedOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: ''
        }
        setUser(signedOutUser);
      })
    console.log('signedOut clicked');
  }
  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignedOut}>Sign out</button> :
          <button onClick={handleSignin}>Sign in</button>
      }
      {
        user.isSignedUser && <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photoUrl} alt=""></img>
        </div>
      }
    </div>
  );
}

export default App;

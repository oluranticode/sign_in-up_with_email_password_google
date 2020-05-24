import firebase from 'firebase/app';
// when are importing the firebase utility library from the firebase/app
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB5lXHRnYCQRW3SbSACLao6tmUe1IuY-AM",
    authDomain: "sign-59de8.firebaseapp.com",
    databaseURL: "https://sign-59de8.firebaseio.com",
    projectId: "sign-59de8",
    storageBucket: "sign-59de8.appspot.com",
    messagingSenderId: "366758284763",
    appId: "1:366758284763:web:3d7971efa56e6cd08e6bfe",
    measurementId: "G-1WL150GDTT"
  };
// database => firestore ......
  export const createUserProfileDocument = async (userAuth, additionalData) => {
if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    console.log(snapShot);

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
          await userRef.set({
              displayName,   
              email,
              createdAt,
              ...additionalData
          })
      } catch (error) {
          console.log('error creating user', error.message);
      }
  }

  return userRef;

  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  // now to set google authentication utility
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({  prompt: 'select_account' });
  export const signInwithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
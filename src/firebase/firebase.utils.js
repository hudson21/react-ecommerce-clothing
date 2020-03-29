import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAf0RSU6s0DjCoBKesZxmwgNIu5gPPX-qc",
  authDomain: "react-ecommerce-clothing.firebaseapp.com",
  databaseURL: "https://react-ecommerce-clothing.firebaseio.com",
  projectId: "react-ecommerce-clothing",
  storageBucket: "react-ecommerce-clothing.appspot.com",
  messagingSenderId: "210278167229",
  appId: "1:210278167229:web:606aac6393b8355d27fdd4",
  measurementId: "G-N0C3JDQKFX"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch(error) {
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
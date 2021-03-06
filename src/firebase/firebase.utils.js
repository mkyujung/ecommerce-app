import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA5u1nGvvzzYF1lIqrnwWCLTWy4phMNoKw",
    authDomain: "ecommerce-db-1a8ed.firebaseapp.com",
    databaseURL: "https://ecommerce-db-1a8ed.firebaseio.com",
    projectId: "ecommerce-db-1a8ed",
    storageBucket: "ecommerce-db-1a8ed.appspot.com",
    messagingSenderId: "1073086251971",
    appId: "1:1073086251971:web:86560e287f25fab4e43376",
    measurementId: "G-RNV8CCYNTK"
  };

  // pass user auth object to database
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();

    //check if there's any data in this place - if not, create
    if(!snapShot.exists) {
      const { displayName, email } =  userAuth;
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

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;


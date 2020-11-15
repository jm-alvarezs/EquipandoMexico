import api from './api';
import firebase from 'firebase';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: 'AIzaSyA7r9nR8yT4AVyf-w227yFicMZF_LTuN6g',
  authDomain: 'moviles-dev.firebaseapp.com',
  databaseURL: 'https://moviles-dev.firebaseio.com',
  projectId: 'moviles-dev',
  storageBucket: 'moviles-dev.appspot.com',
  messagingSenderId: '865479926197',
  appId: '1:865479926197:web:679627c707e50a4b8279fc',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const getToken = () => auth.currentUser.getIdToken(true);

const auth = firebase.auth();

export default {
  signIn: (email, password) =>
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        return getToken().then((token) => {
          api.defaults.headers.common['Authorization'] = token;
          return user;
        });
      }),
  signInPhone: (phoneNumber) => auth.signInWithPhoneNumber(phoneNumber),
  userLoggedIn: (success, error) =>
    auth.onAuthStateChanged((user) => {
      if (user) {
        getToken().then((token) => {
          api.defaults.headers.common['Authorization'] = token;
          if (success) success(user);
        });
      } else {
        error();
      }
    }),
  signOut: () => auth.signOut(),
  signUp: (correo, password) =>
    auth.createUserWithEmailAndPassword(correo, password),
  recoverPassword: (email) => auth.sendPasswordResetEmail(email),
  getToken: () => auth.currentUser.getIdToken(true),
  updateEmail: (email) => auth.currentUser.updateEmail(email),
};

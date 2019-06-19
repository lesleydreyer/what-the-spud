import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD2u3I-7nHVTpM4BPmxDYtPB3ReBc-o868",
    authDomain: "whatthespud-d726f.firebaseapp.com",
    databaseURL: "https://whatthespud-d726f.firebaseio.com",
    projectId: "whatthespud-d726f",
    storageBucket: "whatthespud-d726f.appspot.com",
    messagingSenderId: "838781791780",
    appId: "1:838781791780:web:7b7a2358692f9d6c"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
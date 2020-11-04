import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBlW0KCwRfgpHBE-rkzmdSN06_R9GyHIMs",
    authDomain: "otp-mern-app.firebaseapp.com",
    databaseURL: "https://otp-mern-app.firebaseio.com",
    projectId: "otp-mern-app",
    storageBucket: "otp-mern-app.appspot.com",
    messagingSenderId: "563712596375",
    appId: "1:563712596375:web:90231387179b6cc99a0cd2",
    measurementId: "G-CQTVNGNESJ"
}

firebase.initializeApp(config)
export default firebase

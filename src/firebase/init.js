import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCYdeigPuvdKyVj0rG53IoUZHaVyawyVZY",
  authDomain: "genzconnect-f5082.firebaseapp.com",
  databaseURL: "https://genzconnect-f5082-default-rtdb.firebaseio.com",
  projectId: "genzconnect-f5082",
  storageBucket: "genzconnect-f5082.appspot.com",
  messagingSenderId: "761396074376",
  appId: "1:761396074376:web:ce2c9a3560a78194698c3d",
  };
firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampInSnapshots: true });

export default firebase.firestore();

// const db = firebase.firestore();

// // date issue fix according to firebase
// const settings = {
//     timestampsInSnapshots: true
// };
// db.settings(settings);

// export default db;
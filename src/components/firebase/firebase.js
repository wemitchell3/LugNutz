import firebase from "firebase/app"
import "firebase/storage"


var firebaseConfig = {
    apiKey: "AIzaSyA0-zVYDYFI_h-IJa_0pEE3n7jFeN37GPo",
    authDomain: "lugnutz-e3991.firebaseapp.com",
    databaseURL: "https://lugnutz-e3991.firebaseio.com",
    projectId: "lugnutz-e3991",
    storageBucket: "lugnutz-e3991.appspot.com",
    messagingSenderId: "751099588838",
    appId: "1:751099588838:web:992982884f55deb6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage()

  export {
      storage, firebase as default
  }
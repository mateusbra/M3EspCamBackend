const express = require("express");
const app = express();
const cors = require("cors");
const firebase_app = require('firebase/app');
const PORT = 8000;
const {getDatabase, ref, get, update} = require('firebase/database');

const firebaseApp = firebase_app.initializeApp ({
  apiKey: "AIzaSyDkDXEzV5L6OxDSd7CFiQwrGEBuQeg59-E",
  authDomain: "espcam-9edcb.firebaseapp.com",
  databaseURL: "https://espcam-9edcb-default-rtdb.firebaseio.com",
  projectId: "espcam-9edcb",
  storageBucket: "espcam-9edcb.appspot.com",
  messagingSenderId: "851470719394",
  appId: "1:851470719394:web:87be0f43da852b7f8abafb"
}, 'firebaseApp');

const firebase_storage = require('firebase/storage');
const { getDownloadURL } = require("firebase/storage");

const db = getDatabase(firebaseApp);
const storage = firebase_storage.getStorage(firebaseApp);

app.use(cors());

app.get('/getURLImage',function(req,res){
    
    getDownloadURL(firebase_storage.ref(storage, 'images/koo.jpg')).then((url) => {
        res.send(JSON.stringify({URL:url}))
    })
    
})

app.listen(PORT, () => {
    console.log("server is running");
})
const express = require("express");
const app = express();
const cors = require("cors");
const firebase_app = require('firebase/app');
const PORT = 8000;
const {getDatabase, ref, get, update} = require('firebase/database');
const { getDownloadURL } = require("firebase/storage");
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
const db = getDatabase(firebaseApp);
const storage = firebase_storage.getStorage(firebaseApp);

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
    next();
});

app.get('/getURLImage',function(req,res){
    getDownloadURL(firebase_storage.ref(storage, 'images/captura.png')).then((url) => {
        res.send(JSON.stringify({URL:url}))
    }) 
})

app.get('/getMode',async function(req,res){
    await get(ref(db, `mode`)).then((snapshot) => {
        if (snapshot.exists()) {
            res.send(JSON.stringify({mode:snapshot.val()}));
        }
    });
})

app.post('/setPresence',function(req,res){
    let presence = req.query.presence === "true";
    update(ref(db, `/`), {
        presence:presence,
      });
      res.send("presença alterado!");
})

app.post('/setServerUrl',function(req,res){
    let serverUrl = req.query.serverUrl === "serverUrl";
    update(ref(db, `/`), {
        serverUrl:serverUrl,
      });
      res.send("serverUrl alterado!");
})

app.post('/setMode',function(req,res){
    let mode = req.query.mode === "true";
    update(ref(db, `/`), {
        mode:mode,
      });
      res.send("modo alterado!");
})

app.get('/getPersonDetected',function(req,res){
    update(ref(db, `person_detected`), {
        mode:mode,
      });
      res.send(snapshot.val());
})


app.listen(PORT, () => {
    console.log("server is running");
})
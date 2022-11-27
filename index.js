const express = require("express");
const app = express();
const cors = require("cors");
const firebase_app = require('firebase/app');
const PORT = 8000;
const {getDatabase, ref, get, update} = require('firebase/database');
const { getMessaging } = require('firebase/messaging');
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
const messaging = getMessaging(app);

app.use(cors());

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
app.post('/setMode',function(req,res){
    let mode = req.query.mode === "true";
    update(ref(db, `/`), {
        mode:mode,
      });
      res.send("modo alterado!");
})

app.post('/sendNotification',function(req,res){
    const registrationTokens = [
        'u2FZMSYQzfq0_oMLLNn1H:APA91bEaK_V1Wac_EDsQYu9O5TLyLCSxJB-a__jBw403a8JA1zv5r8SbS_8NCOJM2G_77XDeo9lP96URx4g1oDpS4kAW6Ev8xyUHs9PU9rF8iEcEPIJKN2MkyqKF9uXQWOXvfC325GND',
        // ...
        'YOUR_REGISTRATION_TOKEN_n'
      ];
      
      
    messaging.getToken({vapidKey: "BIs381c3WGMjFyokj-Jj4N22qiCZIXrV1HOo7C0at1iFdmHZ3iikcJSlNcPM9sSupUQERntZlIpBckZGQ0l5Yc4"});


      getMessaging().
    getMessaging().subscribeToTopic(registrationTokens, "vigilancia")
  .then((response) => {
    // See the MessagingTopicManagementResponse reference documentation
    // for the contents of response.
    console.log('Successfully subscribed to topic:', response);
  })
  .catch((error) => {
    console.log('Error subscribing to topic:', error);
  });
})
app.listen(PORT, () => {
    console.log("server is running");
})
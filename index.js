const express = require("express");
const app = express();
const cors = require("cors");
const firebase = require('firebase/app');
const PORT = 8000;
const {getDatabase, ref, get, update} = require('firebase/database');

const firebaseApp = firebase.initializeApp ({
  apiKey: "AIzaSyDkDXEzV5L6OxDSd7CFiQwrGEBuQeg59-E",
  authDomain: "espcam-9edcb.firebaseapp.com",
  databaseURL: "https://espcam-9edcb-default-rtdb.firebaseio.com",
  projectId: "espcam-9edcb",
  storageBucket: "espcam-9edcb.appspot.com",
  messagingSenderId: "851470719394",
  appId: "1:851470719394:web:87be0f43da852b7f8abafb"
}, 'firebaseApp');

const db = getDatabase(firebaseApp);

app.use(cors());

app.post('/setLumin',function(req,res){
    let luminosity = parseInt(req.query.luminosity);
    update(ref(db, `/`), {
        luminosity:luminosity,
      });
      res.send("luminosidade alterada!");
})

app.get('/getLumin',async function(req,res){
    // Get a database reference to our posts
    await get(ref(db, `luminosity`)).then((snapshot) => {
        if (snapshot.exists()) {
            res.send(JSON.stringify({luminosity:snapshot.val()}));
        }
    });
})

app.post('/setMotion',function(req,res){
    let motion = req.query.motion  === "true";
    update(ref(db, `/`), {
        motion:motion,
      });
      res.send("status do movimento alterado!");
})

app.get('/getMotion',async function(req,res){
    await get(ref(db, `motion`)).then((snapshot) => {
        if (snapshot.exists()) {
            res.send(JSON.stringify({motion:snapshot.val()}));
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

app.get('/getMode',async function(req,res){
    await get(ref(db, `mode`)).then((snapshot) => {
        if (snapshot.exists()) {
            res.send(JSON.stringify({mode:snapshot.val()}));
        }
    });
})

app.post('/setRgb',function(req,res){
    let rgb = req.query.rgb.toUpperCase();
    console.log(rgb);
    update(ref(db, `/`), {
        rgb:rgb,
      });
      res.send("rgb alterado!");
})

app.get('/getRgb',async function(req,res){
    await get(ref(db, `rgb`)).then((snapshot) => {
        if (snapshot.exists()) {
            res.send(JSON.stringify({rgb:snapshot.val()}));
        }
    });
})

app.post('/setLight',function(req,res){
    let light = req.query.light === "true";
    update(ref(db, `/`), {
        light:light,
      });
      res.send("status da luz alterado!");
})

app.get('/getLight',async function(req,res){
    await get(ref(db, `light`)).then((snapshot) => {
        if (snapshot.exists()) {
            res.send(JSON.stringify({light:snapshot.val()}));
        }
    });
})

app.listen(PORT, () => {
    console.log("server is running");
})
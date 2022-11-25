const express = require("express");
const app = express();
const cors = require("cors");
const firebase = require('firebase/app');
const PORT = 8000;
const {getDatabase, ref, get, update} = require('firebase/database');

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyB5-Gs1Y8AHH2pD6cVM0h7Skv_lDk_ZBwo",
    authDomain: "lampwithesp32.firebaseapp.com",
    projectId: "lampwithesp32",
    storageBucket: "lampwithesp32.appspot.com",
    messagingSenderId: "448902725351",
    appId: "1:448902725351:web:ded5ad9c3f3db6faffec42"
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
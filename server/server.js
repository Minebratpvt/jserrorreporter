// This file should be running on the server

const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountKey.json'); //Do not share the serviceAccountkey publicly
const cors = require('cors')

const app = express();


var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

//Initializing the firebase db and initializing the express app

const db = admin.firestore(); // Initializing firestore db

 // Initializing the express app

app.use(bodyParser.json()); // Using bodyparser to access the body of the request and response

app.use(cors(corsOptions))

app.listen(8000, () => {
    console.log('Server started!');
   
  });

 

app.route('/api/errors/angular').post((req, res) => {
  if(checkForDuplicateAngularErrors(req.body)){
    db.collection('errors/CjsI5q1aYaiVeCMd9P05/AngularErrors').doc().set(req.body);
    res.send(201, req.body);
  }
  else{
    console.log("Error already exists");
    res.status(201);
  }  
   
  });

app.route('/api/errors/javascript').post((req, res) => {
    if(checkForDuplicateJsErrors(req.body)){
      db.collection('errors/CjsI5q1aYaiVeCMd9P05/JavascriptErrors').doc().set(req.body);
      res.status(201).send(req.body);
    }
    else{
      console.log("Error already exists");
      res.status(201);
    }
    
});



function checkForDuplicateJsErrors(reportedError){
  var dbRef = db.collection('errors/CjsI5q1aYaiVeCMd9P05/JavascriptErrors');
  allJsErrors = dbRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if(doc.error == reportedError.error){
          return false;
        }
        else{
          return true;
        }
      });
    }) 
}

function checkForDuplicateAngularErrors(reportedError){
  var dbRef = db.collection('errors/CjsI5q1aYaiVeCMd9P05/AngularErrors');
  allAngularErrors = dbRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if(doc.stackTrace == reportedError.stackTrace){
          return false;
        }
        else{
          return true;
        }
      });
    }) 
}
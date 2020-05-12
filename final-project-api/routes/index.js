const express = require ("express");

const router = express.Router();

//require firebase
const firebase = require("firebase");
//initalize firestore database
const db = firebase.firestore();

//reference to collection
const posts = db.collection("posts");


router.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept"
  );

const postsArray = [];
//get blog posts
posts
.get()
.then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      //push doc into array every time the query loops over existing articles
    postsArray.push(doc.data());
  });
  return res.send(postsArray);
})
.catch(function(error){
  console.log('Error:', error);
  return res.send(error);
});

});

module.exports = router;

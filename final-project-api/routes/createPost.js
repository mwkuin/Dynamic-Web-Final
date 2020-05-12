const express = require ("express");
const router = express.Router();

//requires firebase
const firebase = require("firebase");

const db = firebase.firestore();
const posts = db.collection("posts");


// /create
router.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept"
  );

  const queryParams = req.query;
  posts
  .doc(queryParams.id)
  .set(queryParams)
  .then(function (doc) {
    res.send({succcess: 'Successful Submission'});
  })
  .catch(function(error) {
    console.log('Error', error);
    res.send("Error submitting: ${error.toString()}");
  });
});

module.exports = router;

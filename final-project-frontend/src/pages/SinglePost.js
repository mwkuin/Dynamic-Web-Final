import React, {useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

function SinglePost() {
  const [postData, setPostData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
       //My API endpoint
       //Local:
      // `http://localhost:4000/post/${id}`
      //Production:
      `https://afternoon-river-65662.herokuapp.com/post/${id}`
      )
      .then(function (response) {
        // handle success
        setPostData(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

  }, []);

  return <div className="SinglePost Wrapper">
  <p>{postData.text}</p>

  </div>;
}

export default SinglePost;

import React, { useEffect, useState } from "react";
import axios from "axios";
//Components
import CreatePostForm from '../components/CreatePostForm'

function Home( {userInfo} ) {
  const [allPosts, setAllPosts] = useState([]);
  const email = userInfo.email;
  const uid = userInfo.uid;

  useEffect(() => {

    axios
      .get(
       //My API endpoint
       //Local:
      // `http://localhost:4000`
      //Production:
      `https://afternoon-river-65662.herokuapp.com/`
      )
      .then(function (response) {
        // handle success
        setAllPosts(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

  }, []);

//Create a Post
  function createPostFunction(e) {
    e.preventDefault();
    let text = e.currentTarget.postText.value;
    let idFromText = text.replace(/\s+/g, "-").toLowerCase().substr(0,16);
    let userId = uid;

    axios
      .get(
       //My API endpoint
       //Local:
      // `http://localhost:4000/create?text=${text}&id=${idFromText}&userId=${userId}`
      //Production:
      `https://afternoon-river-65662.herokuapp.com/create?text=${text}&id=${idFromText}&userId=${userId}`
      )
      .then(function (response) {
        // handle success
        console.log('response', response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

  }

  return (

    <div className="Wrapper">
      <h1>Welcome, {email}</h1>
      <div className="CreatePost">
        <h2>Let your thoughts out</h2>
        <CreatePostForm createPostFunction={createPostFunction}/>
      </div>
      <div className="">
        <h2>All Musings</h2>
        {allPosts.map((post, i) => (
          <p key={i}>
            <a href={`/post/${post.id}`}>{post.text}</a>
          </p>
        ))}
      </div>
    </div>
  )
};

export default Home;

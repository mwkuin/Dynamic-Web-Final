import React from "react";

function CreatePostForm( {createPostFunction} ) {
  return (

      <form className="Form CreatePostForm" onSubmit={(e) => createPostFunction(e)}>
        <label htmlFor="postText">Text</label>
        <input type="text" name="postText" />
        <button>Submit</button>
      </form>

  );
}

export default CreatePostForm;

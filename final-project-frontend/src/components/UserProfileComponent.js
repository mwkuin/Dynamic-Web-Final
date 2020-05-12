import React from "react";

function UserProfileComponent( {userInfo} ) {
  return (
    <div>
      <p>User Profile</p>
      <p> User Email: {userInfo.email}</p>
    </div>
  );
}

export default UserProfileComponent;

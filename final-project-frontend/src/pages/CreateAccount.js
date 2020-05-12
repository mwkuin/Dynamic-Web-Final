import React from "react";
//Components
import CreateAccountForm from '../components/CreateAccountForm';

function CreateAccount( {CreateAccountFunction} ) {
  return (
    <div className="Wrapper">
      <h1>Create Account</h1>
      <div className="CreateWrapper">
        <CreateAccountForm CreateAccountFunction={CreateAccountFunction} />
        <div className="CreateInformation">
          <h2>About Logo Site</h2>
          <p>A space to get your thoughts out of your head. No musing is too big or too small.</p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;

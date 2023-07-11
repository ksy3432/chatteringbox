import React, { useState } from "react";
import Add from "../img/addAvatar.png"


const Register = () => {

    return(
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chattering Box</span>
        <span className="title">Register</span>
        <form>
            <input type="text" placeholder="display name" name="displayName" />
            <input type="email" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />
            <input style={{display:"none"}} type="file" id="file"/>
            <label htmlFor="" id="file">
              <img src={Add} alt="no img" />
              <span>Add an avatar</span>
            </label>
            <button >sign up</button>
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
    );
}

export default Register;
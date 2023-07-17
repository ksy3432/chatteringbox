import React, { useState } from "react";
import Add from "../img/addAvatar.png"


const Login = () => {

    return(
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chattering Box</span>
        <span className="title">Login</span>
        <form>
            <input type="email" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />

            <button >sign in</button>
        </form>
        <p>You do have an account? Register</p>
      </div>
    </div>
    );
}

export default Login;
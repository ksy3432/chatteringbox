import React, { useState } from "react";
import Add from "../img/addAvatar.png"
import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "../fbase";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const [err,setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {  
      await signInWithEmailAndPassword(authService,email,password);
      navigate("/");
     
    } catch (err) {
      setErr(true);
    }
  };

    return(
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chattering Box</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />

            <button >sign in</button>
            {err && <span>Something went Wrong</span>}
        </form>
        <p>You do have an account?<Link to="/register">Register</Link></p>
      </div>
    </div>
    );
}

export default Login;
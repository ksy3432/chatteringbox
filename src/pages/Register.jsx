import React, { useState } from "react";
import Add from "../img/addAvatar.png"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authService, storageService } from "../fbase";
import { ref,uploadBytesResumable,getDownloadURL, } from "@firebase/storage";


const Register = () => {
    const [err,setErr] = useState(false);

    const handleSubmit = async (e) =>{
      e.preventDefault();

      const displayName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      const file = e.target[3].files[9];

      try{
        const res = await createUserWithEmailAndPassword(authService,email,password);

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storageService, displayName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
        (error) => {
          setErr(true);
        }, 
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
        }
      )
      }catch(err){
        setErr(true);
      }

    }


    return(
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chattering Box</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="display name" name="displayName" />
            <input type="email" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />
            <input style={{display:"none"}} type="file" id="file"/>
            <label htmlFor="" id="file">
              <img src={Add} alt="no img" />
              <span>Add an avatar</span>
            </label>
            <button >sign up</button>
            {err && <span>Something went Wrong</span>}
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
    );
}

export default Register;
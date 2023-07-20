import React, { useState } from "react";
import Add from "../img/addAvatar.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authService, dbService, storageService } from "../fbase";
import { ref,uploadBytesResumable,getDownloadURL, } from "@firebase/storage";
import { doc,setDoc } from "@firebase/firestore";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
    const [err,setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
      e.preventDefault();

      const displayName = e.target[0].value;
      const email = e.target[1].value;
      const password = e.target[2].value;
      const file = e.target[3].files[0];

      try {  
        const res = await createUserWithEmailAndPassword(authService, email, password);
  
        const storageRef = ref(storageService, `users/${displayName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          'state_changed',
          (snapshot) => {           //여기부터 3줄 제외하면 오류 발생 -> 계정 추가와 이미지 올리기는 작동하지만 setdoc이 작동하지 않음
          },
          (error) => {
            setErr(true);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
  
              await setDoc(doc(dbService, 'users', res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });

              await setDoc(doc(dbService,"userChats",res.user.uid),{});
              navigate("/");

            }catch (error) {
              setErr(true);
            }
          }
        );
      } catch (err) {
        setErr(true);
      }
    };

    return(
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chattering Box</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
            <input required type="text" placeholder="display name" name="displayName" />
            <input required type="email" placeholder="email" name="email" />
            <input required type="password" placeholder="password" name="password" />
            <input required style={{display:"none"}} type="file" id="file"/>
            <label htmlFor="file">
              <img src={Add} alt="no img" />
              <span>Add an avatar</span>
            </label>
            <button >sign up</button>
            {err && <span>Something went Wrong</span>}
        </form>
        <p>You do have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
    );
}

export default Register;
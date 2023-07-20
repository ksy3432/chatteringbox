import { collection, getDocs, query, serverTimestamp, setDoc, updateDoc, where, doc, getDoc } from '@firebase/firestore';
import React, { useState } from 'react'
import { dbService } from '../fbase';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  const handleSearch = async () => {
    const userRef = collection(dbService,"users");
    const q = query(userRef, where("displayName","==",username));

    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
    });
    }catch(err){
      setErr(true);
    }
  };

  const handlekey = (e) => {
    e.code === "Enter" && handleSearch();
  }; 

  const handleSelect = async () => {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try{
      const res = await getDoc(doc(dbService,"chats",combinedId));

      if(!res.exists()){
        await setDoc(doc(dbService,"chats",combinedId),{messages : []});

        await updateDoc(doc(dbService,"userChats",currentUser.uid),{
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(dbService,"userChats",user.uid),{
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(), 
        });
      }
    }catch(err){}

    setUser(null);
    setUsername("");
  }


  return (
    <div className='search'>
        <div className="searchForm">
            <input type="text" placeholder='find a user' onKeyDown={handlekey} onChange={(e)=>setUsername(e.target.value)} value={username} />
        </div>
        {err && <span>User not found!</span>}
        {user && (
        <div className="userChat" onClick={handleSelect} >
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
            <span>{user.displayName}</span>
        </div>
    </div>
    )}
    </div>
  )
}

export default Search
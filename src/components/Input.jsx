import React, { useContext, useState } from 'react'
import Img from "../img/img.png"
import Attach from "../img/attach.png"
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, updateDoc } from '@firebase/firestore';
import { dbService, storageService } from '../fbase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';

const Input = () => {
  const [text,setText] = useState("");
  const [img,setImg] = useState(null);
  const [err,setErr] = useState(false);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const handlesend = async () => {
    if(img){
      const storageRef = ref(storageService, `users/${uuid()}`);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        'state_changed',
        (snapshot) => {           //여기부터 3줄 제외하면 오류 발생 -> 계정 추가와 이미지 올리기는 작동하지만 setdoc이 작동하지 않음
        },
        (err) => {
          setErr(true);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            await updateDoc(doc(dbService,"chats",data.chatId),{
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId:currentUser.uid,
                date:Timestamp.now(),
                img:downloadURL,
              }),
            });

          }catch (err) {
            setErr(true);
          }
        }
      );

    }else{
      await updateDoc(doc(dbService,"chats",data.chatId),{
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId:currentUser.uid,
          date:Timestamp.now(),
        }),
      });
    }
  }

  return (
    <div className='input'>
      <input type="text" placeholder='Type something...' onChange={e=>setText(e.target.value)} />
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" style={{display:"none"}} id='file' onChange={e=>setImg(e.target.files[0])} />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handlesend}>Send</button>
      </div>
    </div>
  )
}

export default Input
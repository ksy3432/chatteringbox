import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from '@firebase/firestore';
import { dbService } from '../fbase';

const Messages = () => {
  const [messages,setMessages] = useState([]);
  const {data} = useContext(ChatContext);

  useEffect(()=>{
    const unsub = onSnapshot(doc(dbService,"chats",data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data());
    });

    return ()=>{
      unsub();
    };

  },[data.chatId]);

  return (
    <div className='messages'>
      {messages.map((m)=>(
        <Message message={m} key={m.id} />
      ))}
    </div>
  )
}

export default Messages
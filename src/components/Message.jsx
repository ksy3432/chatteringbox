import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  return (
    <div className='message owner'>
       {/* <div className="messageInfo">
          <img src="https://cdn.pixabay.com/photo/2023/07/10/14/41/bird-8118490_640.jpg" alt="" />
          <span>just now</span>
        </div>
        <div className="messageContent">
          <p>Hello</p>
          <img src="https://cdn.pixabay.com/photo/2023/05/12/03/12/australian-king-parrot-7987514_640.jpg" alt="" />
        </div>
  */}
    </div>
  )
}

export default Message
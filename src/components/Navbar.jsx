import { signOut } from 'firebase/auth'
import React from 'react'
import { authService } from '../fbase'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);

  return (
    <div className='navbar'>
        <span className="logo">Chatteringbox</span>
        <div className="user">
            <img src={currentUser.photoURL} alt="no img" />
            <span>{currentUser.displayName}</span>
            <button onClick={()=>signOut(authService)}>logout</button>
        </div>
    </div>
  )
}

export default Navbar
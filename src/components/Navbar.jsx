import { signOut } from 'firebase/auth'
import React from 'react'
import { authService } from '../fbase'

const Navbar = () => {
  return (
    <div className='navbar'>
        <span className="logo">Chatteringbox</span>
        <div className="user">
            <img src="https://cdn.pixabay.com/photo/2023/07/10/06/54/mountain-8117579_1280.jpg" alt="no img" />
            <span>kim</span>
            <button onClick={()=>signOut(authService)}>logout</button>
        </div>
    </div>
  )
}

export default Navbar
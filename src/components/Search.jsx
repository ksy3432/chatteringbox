import React from 'react'

const Search = () => {
  return (
    <div className='search'>
        <div className="searchForm">
            <input type="text" placeholder='find a user' />
        </div>
        <div className="userChat">
            <img src="https://cdn.pixabay.com/photo/2023/07/07/07/46/cat-8111947_640.jpg" alt="" />
            <div className="userChatInfo">
                <span>sea</span>
            </div>
        </div>
    </div>
  )
}

export default Search
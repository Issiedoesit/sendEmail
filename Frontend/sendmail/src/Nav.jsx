import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='w-full flex items-center py-4 px-10 gap-6  text-fuchsia-500 bg-black'>
        <NavLink to="/" >SendMail</NavLink>
        <NavLink to="/posts">Posts</NavLink>
    </nav>
  )
}

export default Nav
import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons'
import './Header.css'

function Header () {
  return (
    <div className='navBar'>
      <img className='logo' src='./logo.png' alt='logo WealthHealth' />
      <h1> HRnet </h1>
      <Link to='/'>
        <FontAwesomeIcon className='iconHeader' icon={faUserPlus} />
        <span>Create Employee</span>
      </Link>
      <Link to='/listemployees'>
        <FontAwesomeIcon className='iconHeader' icon={faUsers} />
        <span>View Current Employees</span>
      </Link>
    </div>
  )
}

export default Header

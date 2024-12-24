import React from 'react'; 
import './Navbar.css'; 
import Button from '../UI/Button';

const logoStyle = {
    height:'80px', 
    weight:'80px'
}

export default function Navbar() {
  return (
    <div className='nav-bar'>
        <img style={logoStyle} src='Logo.png' alt='logo' />
        <div className='other-options'>
          <div><h4>About us</h4></div>
          <div><h4>Contact us</h4></div> 
        </div>
    </div>
  )
}

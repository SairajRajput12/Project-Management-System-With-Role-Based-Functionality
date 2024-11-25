import React from 'react'
import './DashBoard.css'
import SideBoard from './SideBoard'
import ViewBoard from './ViewBoard'

export default function DashBoard({children}) {
  return (
    <>
        <div className='dashboard'> 
            {children}
        </div>
    </>
  )
}

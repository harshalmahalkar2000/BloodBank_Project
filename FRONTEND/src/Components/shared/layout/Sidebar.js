import React from 'react'
import { useMenu } from './menus/menu'
import { Link, useLocation } from 'react-router-dom'
import '../../../../src/styles/layout.css'


function Sidebar() {
    const location =useLocation()
  return (
    <div>
      <div className='sidebar'>
        <div className='menu'>
            {useMenu.map((menu)=>{
                const isActive=location.pathname===menu.path
                return (
                    <>
                    <div className={`menu-item ${isActive && 'active'}`}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                    </div>
                   
                    </>
                )
            })}
        </div>
      </div>
    </div>
  )
}

export default Sidebar

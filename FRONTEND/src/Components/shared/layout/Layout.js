import React, { Children } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'


function Layout({children}) {
  return (
    <>
        <div className='header'>
            <Header/>
        </div>

        <div className='row g-0'>
          <div className='col-3'><Sidebar/></div>
          <div className='col-9'>{children}</div>

        </div>

    </>
      
    
  )
}

export default Layout

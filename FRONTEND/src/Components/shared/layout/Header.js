import React from 'react'
import {BiDonateBlood, BiUserCircle } from 'react-icons/bi'
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'





function Header() {
  const {user}=useSelector((state)=>state.auth)
  const navigate=useNavigate()

  //Handel Logout
  function handelLogout(){
    localStorage.clear()
    alert("Logout Successfully")
    navigate('/login')

  }


  return (
    <div>
      <nav className='navbar bg-dark  '>
        <div className='container-fluid'>
        
            <div className='navbar-brand  text-light'>
              <BiDonateBlood className='text-danger h1'/>   Blood Bank Collection 
            </div>
            <ul className='navbar-nav flex-row '>
                <li className='navbar-item mx-3'>
                    <p className='nav-link  text-light'><BiUserCircle className='text-light h5 me-1'/>Welcome {user?.name || user?.organisationName || user?.hospitalName} &nbsp; 
                    <span className="badge bg-secondary">{user?.role}</span>
                     </p>
                </li>
                <li className='navbar-item mx-3' >
                    <button className='btn btn-danger' onClick={handelLogout}> Logout</button>
                </li>
            </ul>

        </div>

      </nav>
    </div>
  )
}

export default Header

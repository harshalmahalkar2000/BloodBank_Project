import React from 'react'
import Form from '../../Components/shared/Form/Form'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import Spinner from '../../Components/Spinner'


function Register() {

  const {loading, error}=useSelector(state=>state.auth)
  return (
    <>

      {error && <span>{alert(error)}</span>}

      {
        loading ? <Spinner/>:(
          
      <div className='row g-0'>
        <div className='col-md-8 form-banner'>
          <img src='./assets/Images/banner-1.jpg' alt='loginpage'/>
        </div>
        <div className='col-md-4 form-container'>

          <Form formTitle={'Register'} submitBtn={"Register"} formType={'register'}/>
      
        </div>

      </div>

      )
      }
        
    
    </>
   

  )
}

export default Register

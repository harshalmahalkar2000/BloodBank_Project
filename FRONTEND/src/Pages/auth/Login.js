import React from 'react'

import Form from '../../Components/shared/Form/Form'
import {useSelector} from 'react-redux'
import Spinner from '../../Components/Spinner'


function Login() {

  const {loading, error}=useSelector(state=>state.auth)
  return (
    <>

    {error && <span>{alert(error)}</span>}
    {
      loading ? (<Spinner/>):(

        <div className='row'>

          <div className='col-md-8 form-banner'>
            <img src='./assets/Images/banner-1.jpg' alt='loginpage'/>
          </div>

          <div className='col-md-4 form-container'>

            <Form formTitle={'Login Page'} submitBtn={"Login"} formType={'login'}/>
          </div>

        </div>
      )
    }
      
    </>
  )
}

export default Login

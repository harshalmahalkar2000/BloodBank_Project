import React, { useState } from 'react'
import InputType from './InputType'
import { Link } from 'react-router-dom'
import { handelLogin, handelRegister } from '../../../Services/authService'

function Form({submitBtn,formTitle,formType}) {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [role,setRole]=useState('donar')
    const [name,setName]=useState('')
    const [organisationName, setOrganisationName]=useState('')
    const [hospitalName,setHospitalName]=useState('')
    const [ website,setWebsite]=useState('')
    const [address,setAddress]=useState('')
    const [phone,setPhone]=useState('')

  return (
    <div>
      <form onSubmit={(e)=>{
        if(formType==='login')
          return handelLogin(e,email,password,role)
        else if(formType==='register')
           return handelRegister(e,name,role,email,password,organisationName,hospitalName,website,address,phone)
      }}>
        <h1>{formTitle}</h1>
        <hr/>
        <div className='d-flex mb-3'>
          <div className='form-check'>
            <input type='radio' className='form-check-input' 
            name='role'
            id='donarRadio' 
            value={'donar'} 
            onChange={(e)=>setRole(e.target.value)} 
            defaultChecked/> 

            <label htmlFor='donarRadio' className='form-checke-label'>Donar</label>

          </div>

          <div className='form-check ms-2'>
            <input type='radio' className='form-check-input' 
            name='role'
            id='adminRadio' 
            value={'admin'} 
            onChange={(e)=>setRole(e.target.value)} 
            /> 

            <label htmlFor='adminRadio' className='form-checke-label'>Admin</label>

          </div>

          <div className='form-check ms-2'>
            <input type='radio' className='form-check-input' 
            name='role'
            id='organisationRadio' 
            value={'organisation'} 
            onChange={(e)=>setRole(e.target.value)} 
            defaultChecked/> 

            <label htmlFor='organisationRadio' className='form-checke-label'>Organisation</label>

          </div>

          <div className='form-check ms-2'>
            <input type='radio' className='form-check-input' 
            name='role'
            id='hospitalRadio' 
            value={'hospital'} 
            onChange={(e)=>setRole(e.target.value)} 
            defaultChecked/> 

            <label htmlFor='hospitalRadio' className='form-checke-label'>Hospital</label>

          </div>


         
        </div>
        {(()=>{
          switch(true){
            case formType === 'login':
              return (
                <>
                <InputType 
                lableText={'Email'}
                labelFor={'forEmail'}
                inputType={'email'}
                name={'email'}
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />

                <InputType 
                lableText={'Password'}
                labelFor={'forpassword'}
                inputType={'password'}
                name={'password'}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />

                </>
              )

            case formType === 'register':
              return (
                <>

                {(role==='admin'|| role==='donar')&&(
                  
                <InputType 
                lableText={'Name'}
                labelFor={'forname'}
                inputType={'text'}
                name={'name'}
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                )}


                {role==='organisation' && (

                   <InputType 
                   lableText={'organisation Name'}
                   labelFor={'fororganisationName'}
                   inputType={'text'}
                   name={'organisationName'}
                   value={organisationName}
                   onChange={(e)=>setOrganisationName(e.target.value)}
                   />
                )}

                {role==='hospital' && (
                    <InputType 
                    lableText={'Hospital Name'}
                    labelFor={'forhospitalName'}
                    inputType={'text'}
                    name={'hospitalName'}
                    value={hospitalName}
                    onChange={(e)=>setHospitalName(e.target.value)}
                    />
                )}

                <InputType 
                lableText={'Email'}
                labelFor={'forEmail'}
                inputType={'email'}
                name={'email'}
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />

                <InputType 
                lableText={'Password'}
                labelFor={'forpassword'}
                inputType={'password'}
                name={'password'}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />


                <InputType 
                lableText={'Website'}
                labelFor={'forwebsite'}
                inputType={'text'}
                name={'website'}
                value={website}
                onChange={(e)=>setWebsite(e.target.value)}
                />

                <InputType 
                lableText={'Address'}
                labelFor={'foraddress'}
                inputType={'text'}
                name={'address'}
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                />

                <InputType 
                lableText={'Phone'}
                labelFor={'forphone'}
                inputType={'text'}
                name={'phone'}
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                />


                </>
              ) 
              
              default:
                return
          }
        })()}


        <div className='d-flex justify-content-between'>


          {formType==='login'? (
          <p>Not Register yet ? Register 
            <Link to='/register'>Here !</Link>
            </p>):(
               <p>Already user Please
               <Link to='/login'>Login !</Link>
               </p>
            )}

          <button className='btn btn-primary' type='submit'>{submitBtn}</button>
        </div>


      </form>
    </div>
  )
}

export default Form

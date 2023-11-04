import React, { useState } from 'react'
import InputType from '../Form/InputType'
import API from '../../../Services/API'
import { useSelector } from 'react-redux';

function Modal() {
    const [inventoryType,setInventoryType]=useState('in')
    const [bloodGroup,setBloodGroup]=useState('')
    const [quantity,setQuantity]=useState(0)
    const [email,setEmail]=useState('')

    const {user}=useSelector(state=>state.auth)


    const handelModalSubmit= async ()=>{
        try{
            if(!bloodGroup || !quantity){
                return alert("Please Provide all fields")
            }
            
            const {data}= await API.post('/inventory/create/create-inventory', {
                email,
                
                organisation:user?._id,

                inventoryType,
                bloodGroup,
                quantity
            } )

            if(data?.success){
                alert('New Record Created')
                window.location.reload()
            }
        }
        catch(error){
            alert(error.response.data.message)
            window.location.reload()
             console.log(error)
        }

    }
  return (
    <div>
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Manage blood Records</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
            <div className='d-flex'>
                BloodType: &nbsp;
                <div className='form-check me-3'>
                    <input type='radio'
                     value={'in'}
                     onChange={(e)=>setInventoryType(e.target.value)}
                     name='inradio' 
                     defaultChecked 
                     className='form-check-input'/>
                     <label htmlFor='in' className='form-check-label'>In</label>
                </div>
                
                <div className='form-check,ms-3'>
                    <input type='radio'
                     value={'out'}
                     onChange={(e)=>setInventoryType(e.target.value)}
                     name='inradio' 
                     
                     className='form-check-input'/>
                     <label htmlFor='out' className='form-check-label'>Out</label>
                </div>
            </div>
        </div>
       
        <select className="form-select" aria-label="Default select example" onChange={(e)=>setBloodGroup(e.target.value)}>
            <option selected>Select Blood Group</option>
            <option value={'O+'}>O+</option>
            <option value={'O-'}>O-</option>
            <option value={'AB+'}>AB+</option>
            <option value={'AB-'}>AB-</option>
            <option value={'A+'}>A+</option>
            <option value={'A-'}>A-</option>
            <option value={'B+'}>B+</option>
            <option value={'B-'}>B-</option>
            
        </select>
        <br/>

        <InputType htmlFor={'Donar Email'}
         lableText={'Donar Email'}
         inputType={'email'}
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
        />

        <InputType htmlFor={'quantity'}
         lableText={'Quantity'}
         inputType={'Number'}
         value={quantity}
         onChange={(e)=>setQuantity(e.target.value)}
        />
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={handelModalSubmit}>Submit</button>
        </div>
    

        </div>
    </div>
    </div>

    </div>
  )
}

export default Modal

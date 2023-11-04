import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../Components/Spinner'
import Layout from '../Components/shared/layout/Layout'
import Modal from '../Components/shared/Modal/Modal'
import API from '../Services/API'
import moment from 'moment'


function Home() {

  
  const {loading, error}=useSelector(state=>state.auth)

  const [data,setData]=useState([])
  const getBloodRecords= async()=>{
    try{
      const {data}=await API.get('/inventory/get-inventory')      
       if(data?.success){
          setData(data?.inventory)
          console.log(data)
        }

      
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getBloodRecords()
  },[])

  return (
    
    <Layout>
         {error && <span>{alert(error)}</span>}
      {
        loading ? <Spinner/>:(
          <>
            <h4 className='ms-4' data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{cursor:'pointer'}}><i class=" fa-solid fa-plus text-success py-5 me-2"></i>  Inventory</h4>
            <table class="table container">
              <thead>
                <tr>
                  <th scope="col">BloodGroup</th>
                  <th scope="col">Inventory</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Donar Email</th>
                  <th scope="col">Time & Date </th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.map((record)=>(
                    <tr key={record._id}>
                      <td>{record.bloodGroup}</td>
                      <td>{record.inventoryType}</td>
                      <td>{record.quantity}</td>
                      <td>{record.donarEmail}</td>
                      <td>{moment(record.createdAt).format('DD/MM/YY hh:mm' )}</td>

                    </tr>
                  ))
                }
              </tbody>
            </table>
            <Modal/>

          </>
          

        )
      }
     
    </Layout>
   
    
  )
}

export default Home

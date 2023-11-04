import React, { useEffect, useState } from 'react'
import Layout from '../../Components/shared/layout/Layout'
import API from '../../Services/API'
import moment from 'moment'

function Hospital() {
    const [data,setData]=useState([])

    const getData=async()=>{
        try{
            const {data}=await API.get('/inventory/get-hospital')
            console.log(data)
            if(data?.success){
                setData(data?.hospitals)
            }
            
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getData()
    },[])
  return (
    <Layout>
     <table className='table container'>
        <thead>
            <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Phone</th>
            <th scope='col'>Address</th>
            <th scope='col'>Date</th>
            </tr>
            
        </thead>
        <tbody>
            {
                data?.map((record)=>(
                    <tr key={record._id}>
                        <td>{record.hospitalName}</td>
                        <td>{record.email}</td>
                        <td>{record.phone}</td>
                        <td>{record.address}</td>
                        <td>{moment(record.createAt).format('DD/MM/YY hh:mm A')}</td>
                    </tr>
                ))
            }
        </tbody>

     </table>
    </Layout>
  ) 
}

export default Hospital

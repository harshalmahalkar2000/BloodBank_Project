import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import API from '../../Services/API'
import { getCurrentuser } from '../../Redux/features/auth/AuthAction'
import {Navigate} from 'react-router-dom'

function ProtectedRoute({children}) {
    const dispatch=useDispatch()

    //get current user
    const getUser=async()=>{
        try{
            const {data}=await API.get('/auth/current-user')
            if(data?.success){
                dispatch(getCurrentuser(data))
            }

        }
        catch(error){
            localStorage.clear()
            console.log(error)
        }
    } 

    useEffect(()=>{
        getUser()
    })

    if(localStorage.getItem('token')){
        return children
    }
    else{
        return <Navigate to='/login'/>
    }


}

export default ProtectedRoute

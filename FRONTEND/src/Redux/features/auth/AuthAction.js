import {createAsyncThunk} from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import API from '../../../Services/API'



export const userLogin=createAsyncThunk('/auth/login', async ({role,email,password},{rejectWithValue})=>{
    try{
        const {data}=await API.post('/auth/login',{role,email,password})
        if(data.success){
            localStorage.setItem('token',data.token)
            alert(data.message)
            window.location.replace('/')
        }

        return data;
    }
    catch(error){
        if(error.response && error.response.data.message ){
            return rejectWithValue(error.response.data.message)
        }
        else{
            return rejectWithValue(error.message)
        }
    }

})

export const  userRegister=createAsyncThunk('auth/register',async (
    {
        name,role,email,password,organisationName,hospitalName,website,address,phone
    },{rejectWithValue}
)=>{
    try{
        const {data}=await API.post('/auth/register',{ name,role,email,password,organisationName,hospitalName,website,address,phone})

        if(data.success){
            alert("user registered Successfully")
            window.location.replace('login')
            // toast.success(data.message)
          

        }

        return data
    }
    catch(error){
        if(error.response && error.response.data.message ){
             return rejectWithValue(error.response.data.message)
        }
        else{
            return  rejectWithValue(error.message)
        }
    } 
})





// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';
// import API from '../../../Services/API';

// export const userLogin = createAsyncThunk('/auth/login', async ({ role, email, password }, { rejectWithValue }) => {
//   try {
//     const { data } = await API.post('/auth/login', { role, email, password });
//     if (data.success) {
//       localStorage.setItem('token', data.token);
//       toast.success(data.message);
//     }
//     return data;
//   } catch (error) {
//     if (error.response && error.response.data.message) {
//       return rejectWithValue(error.response.data.message);
//     } else {
//       return rejectWithValue(error.message);
//     }
//   }
// });

// export const userRegister = createAsyncThunk('auth/register', async (
//   {
//     name, role, email, password, organisationName, hospitalName, website, address, phone
//   }, { rejectWithValue }) => {
//   try {
//     const { data } = await API.post('/auth/register', {
//       name, role, email, password, organisationName, hospitalName, website, address, phone
//     });

//     if (data.success) {
//       toast.success(data.message);
//       // If you want to redirect to a specific location, provide the URL here
//       window.location.replace('login');
//     }
//     return data;
//   } catch (error) {
//     if (error.response && error.response.data.message) {
//       return rejectWithValue(error.response.data.message);
//     } else {
//       return rejectWithValue(error.message);
//     }
//   }
// });



//current User

export const getCurrentuser= createAsyncThunk('auth/getCurrentUser' , async ({rejectWithValue})=>{
    try{
        const res=await API.get('/auth/current-user')
        if(res?.data){
            return res?.data
        }
    }
    catch(error){
        if(error.response && error.response.data.message ){
             return rejectWithValue(error.response.data.message)
        }
        else{
            return  rejectWithValue(error.message)
        }
    } 
})
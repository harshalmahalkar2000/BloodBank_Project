import { createSlice} from '@reduxjs/toolkit'
import { getCurrentuser, userLogin, userRegister } from './AuthAction'

const token= localStorage.getItem('token')?localStorage.getItem('token'):null;


const initialState={
    loading:false,
    user:null,
    token,
    error:null
}
const AuthSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(userLogin.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        builder.addCase(userLogin.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.user=payload.user;
            state.token=payload.token
        })
        builder.addCase(userLogin.rejected,(state,{payload})=>{
            state.loading=false;
            state.error=payload
        })

        // register user

        builder.addCase(userRegister.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        builder.addCase(userRegister.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.user=payload.user;
          
        })
        builder.addCase(userRegister.rejected,(state,{payload})=>{
            state.loading=false;
            state.error=payload
        })


        //current user
        builder.addCase(getCurrentuser.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        builder.addCase(getCurrentuser.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.user=payload.user;
          
        })
        builder.addCase(getCurrentuser.rejected,(state,{payload})=>{
            state.loading=false;
            state.error=payload
        })
    }
})

export default AuthSlice
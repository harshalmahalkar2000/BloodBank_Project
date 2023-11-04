import Store from "../Redux/Store"
import { userLogin, userRegister } from "./../Redux/features/auth/AuthAction"

export const handelLogin=(e,email,password,role)=>{

    e.preventDefault()
    try{

        if(!role || !email || !password ){
             return alert("Please provide all fields")
        }
        Store.dispatch(userLogin({role,email,password}))
        console.log('login',e,email,password,role)
    }
    catch(error){
        console.log(error)

    }
}

export const handelRegister=(e,name,role,email,password,organisationName,hospitalName,website,address,phone)=>{
    e.preventDefault()
    try{
        Store.dispatch(userRegister({
            name,role,email,password,organisationName,hospitalName,website,address,phone
        }))
        console.log('register=>',e,name,role,email,password,organisationName,hospitalName,website,address,phone)
    }
    catch(error){
        console.log(error)

    }
    
}
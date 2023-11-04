
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/auth/Login';
import Register from './Pages/auth/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './Components/Routes/ProtectedRoute';
import PublicRoute from './Components/Routes/PublicRoute';
import Donar from './Pages/dashboard/Donar';
import Hospital from './Pages/dashboard/Hospital';
// import Organisation from './Pages/dashboard/Organisation';
import Organisation from './Pages/dashboard/Organisation'



function App() {
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
           { <Home/>}
          </ProtectedRoute>
       
        }/>
        <Route path='/login' element={
          <PublicRoute>
            {<Login/>}
          </PublicRoute>
       
        }/>
         <Route path='/donar' element={
          <ProtectedRoute>
            {<Donar/>}
          </ProtectedRoute>
       
        }/>

        <Route path='/hospital' element={
          <ProtectedRoute>
            {<Hospital/>}
          </ProtectedRoute>
       
        }/>

        <Route path='/organisation' element={
          <ProtectedRoute>
            {<Organisation/>}
          </ProtectedRoute>
       
        }/>


        <Route path='/register' element={
          <PublicRoute>
            {<Register/>}
          </PublicRoute>
        }/>
      
      </Routes>
      
    </>
  );
}

export default App;

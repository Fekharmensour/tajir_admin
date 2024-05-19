import React , {useContext} from 'react'
import AuthContext_Dashbord from '../context/AuthContext_Dashbord'
import logo from './../assets/logo.svg';
import background from './img/background.jpg';
import './User/user.css';
import { Toaster, toast } from 'alert';


const SignIn = () => {
  const {login_admin} = useContext(AuthContext_Dashbord)
  return (
    <div className="row " style={{height:'97vh'}}>
      <Toaster position='top-center'/>
      <div className="col-lg-8 back-sign overflow-hidden">
       
      </div>
    <div className='col-lg-4 d-flex justify-content-center align-items-center  p-5' style={{height:'100%', width:'250px' , background:"#eee"}} >
      
      <form onSubmit={login_admin}  className='  rounded-4 d-flex justify-content-center align-items-center flex-column' >
        <div className="mb-5 d-flex align-items-center">
           <img src={logo} alt="" width={50} className='me-2'/>
           <h2 className='fw-bold'>Tajir</h2>
        </div>
        <h2 className='text-start' style={{width:'100%'}}>Welcome to Admin Dashbord </h2>
        <p className='flex-start pe-5' >Please sign-in to your account and start adventure</p>
        <input type="text" className="form-control rounded-2 ps-4 pe-4 mt-3 fs-4 mb-3 py-2" placeholder="Username" aria-label="Username" name='username'/>
        <input type="password" className="form-control ps-4 pe-4  rounded-2 fs-4 py-2" placeholder="Password" aria-label="Password" name='password'/>
        <input type="submit" className="new_patents rounded-2  px-4 fs-5 text-center text-white justify-content-center mt-4" style={{width:'fit-content'}} value='Sign in ' />
      </form>
    </div>
    
    </div>
  )
}

export default SignIn

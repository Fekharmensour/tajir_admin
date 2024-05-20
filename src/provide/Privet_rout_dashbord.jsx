import React, {  useState  , useContext} from 'react';
import {Route,Navigate, Outlet} from "react-router-dom";
import AuthContext_Dashbord from '../context/AuthContext_Dashbord';
import Loader from '../Dashboard/Loader';

const Privet_dashbord = () => {

    const { user_admin , loading} = useContext(AuthContext_Dashbord);
  return (
    user_admin? <Outlet/> : 
    loading? <Loader/> : <Navigate to="/login" />
  )
}

export default  Privet_dashbord ;


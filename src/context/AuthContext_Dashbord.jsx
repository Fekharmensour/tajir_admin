import axios from "axios";
import { createContext  , useState , useEffect} from "react";
import {useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'alert';
import Cookies from 'js-cookie';

const AuthContext_Dashbord = createContext();
export default AuthContext_Dashbord;



export const AuthProvider_Dashbord = ({children}) => {
    const [Admin , setAdmin ]=useState(() => Cookies.get('token') ?  true : false);
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        console.log('is submitting');
        const username = e.target.username.value;
        const password = e.target.password.value;
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/admin/login', {
                "username": username,
                "password": password
            });
    
            if (response.status === 200) {
                toast.success('Login successful');
                Cookies.set('token', response.data.token);
                setAdmin(true);
                navigate('/');

            } else {
                toast.error('Login failed');
            }
        } catch (error) {
            toast.error('An error occurred while logging in');
        }
    };
    const config= {
        headers: {
            'Authorization': `Bearer ${Cookies.get('token')}`
        }
    }; 
   const logout = async ()=>{
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/profile/logout' , config);

        if (response.status === 200) {
            toast.success(response.data.message);
            Cookies.remove('token');
            setAdmin(false);
            navigate('/sign');

        } else {
            toast.error('Login failed');
        }
    } catch (error) {
        toast.error('An error occurred while logging in');
    }
   }

    const ContextData = {
        login_admin : login ,
        user_admin : Admin ,
        logout_admin : logout
      }
  
      return(
          <AuthContext_Dashbord.Provider value={ContextData} >
              {children}
          </AuthContext_Dashbord.Provider>
      )
}
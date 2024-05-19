import React, { useContext, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io"
import { FaCircleUser } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AuthContext_Dashbord from "../context/AuthContext_Dashbord";
import Swal from "sweetalert2";
import logo from "./../assets/logo.svg"
import Cookies from 'js-cookie';
import { Toaster, toast } from 'alert';
import axios from "axios";
const config = {
  headers: {
      'Authorization': `Bearer ${Cookies.get('token')}`
  }
};

const TopBar = () => {
  const [active_search , setActive_serach] = useState(false)
  const { logout_admin} = useContext(AuthContext_Dashbord)
  const [user , setuser] =useState({});
  const navigate = useNavigate();
  const log_out = ()=>{ 
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Exit The Dashbord Interface?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FB923C",
      cancelButtonColor: "#001C30",
      confirmButtonText: "Exit it " ,
      customClass: {
        container: 'swal-container' ,
      }
    }).then((result) => {
      if (result.isConfirmed) {
        logout_admin();
      }
    });
  }
  const fetchuser = async () => {
    try {
      const response = await axios.get( 'http://127.0.0.1:8000/api/profile', config);
      if (response.status === 200) {
        setuser(response.data.buyer); 
      } else {
        console.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchuser()
  },[])

  return (
    <div className="">
      <nav className="navbar p-0">
        <div className="container-fluid">
          <div className=" d-flex ">
            <img src={logo} width={40} className="me-2" />
            <div className="d-none d-sm-block name_logo">Tajir</div>
          </div>
          <div className="icons d-flex align-items-center">
            <div className="searsh d-flex pe-2">
                <input className={active_search?'active':''} type="text" placeholder="Searshing For It" />
                <button className="icon " onClick={()=>setActive_serach(!active_search)}><IoIosSearch /></button>
            </div>
            <div className="notification pe-3" onClick={() => {
              navigate("/notification")
            }}>
                <IoIosNotificationsOutline/>
                <span>9</span>
            </div>
            <div className="user d-flex align-items-center ">
                <div className="image me-2 ">
                  <img className="rounded-circle" src={user.image?`http://127.0.0.1:8000/storage/${user.image}` : "https://bootdey.com/img/Content/avatar/avatar7.png"} width={30} height={30} alt="" />
                </div>
                <div className="nav-item dropdown d-none d-sm-block">
                <Link className="name nav-link dropdown-toggle p-0 " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 {user.username}
                </Link>
                <ul className="dropdown-menu me-3">
                    <li onClick={()=>navigate("/profile")}><Link className="dropdown-item" >Profile</Link></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li onClick={()=>log_out()}><Link className="dropdown-item" to=''> <MeetingRoomIcon className="me-2"/>LogOut </Link></li>
               </ul>
                </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopBar;

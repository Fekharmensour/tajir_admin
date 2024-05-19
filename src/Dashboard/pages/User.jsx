
import React, { useState , useEffect} from 'react';
import TopBar from '../TopBar';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserPlus } from "react-icons/fa";
import UserForm from '../User/UserForm';
import Seller_view from '../User/Seller_view';
import { FaUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from 'axios';
import { TfiLayoutListThumbAlt } from "react-icons/tfi";
import { MdClose } from "react-icons/md";
import { Toaster, toast } from 'alert';
import { TbExchange } from "react-icons/tb";
import Cookies from 'js-cookie';
import NewBuyer from '../User/NewBuyer';

const config = {
  headers: {
      'Authorization': `Bearer ${Cookies.get('token')}`
  }
};


const User =  () => {
  const [search, setSearch] = useState('');
  const [showUserForm, setShowUserForm] = useState(false);
  const [showSellerview, setShowSellerview] = useState(false);
  const [menu, setmenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedSeller, setSelectedSeller] = useState('');
  const [usersData, setUsersData] = useState([]);
  const [sellerDisabledData, setSellerDisabledData] = useState([]);
  const [paginate, setpaginate] = useState(null);
  const [URL, setURL] = useState('http://127.0.0.1:8000/api/users');
  const [roleseller , setRoleSeller ]= useState(false)
  const [rolebuyer , setRoleBuyer ]= useState(true)
  const [ effect , seteffect ]= useState(false)
  const [manageSeller , setManageSeller ]= useState(false)
  const[ShowNewBuyer , SetShowNewBuyer] = useState(false);
  
  const toastStyles = {
    background: '#007bff', // Blue background color
    color: '#ffffff', // White text color
    fontSize: '16px', // Font size
  };

const SellerDisable = async () => {
      try {
        const response = await axios.get( "http://127.0.0.1:8000/api/disabledSellers" , {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.status === 200) {
          console.log(response.data.sellers);
          setSellerDisabledData(response.data.sellers);
        } else {
          console.error(`Request failed with status ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

  const fetchData = async () => {
    try {
      const response = await axios.get( URL , {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        setUsersData(response.data.users);
        setpaginate(response.data.paginate);
      } else {
        console.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    SellerDisable(); 
    setSelectedSeller(null)
    setSelectedUser(null)
  }, [URL, effect]);



  const handelValid = async (id) => {
    try{
      const response = await axios.put(`http://127.0.0.1:8000/api/admin/validSeller/${id}`, {}, config);
        if (response.status === 200) {
            toast.success(response.data.message)
            updateeffect()
        }  
    }catch(err){
        console.error(err.message);
    };
}
  const handleShowUserForm = (user) => {
    setSelectedUser(user)
    setShowUserForm(true);
  };
  const handleShowNewBuyer = () => {
    SetShowNewBuyer(true)
  }
  const handleHideNewBuyer = () => {
    SetShowNewBuyer(false)
  }
  const handleSaveNewBuyer = () => {
    handleHideNewBuyer()
  }
  const handleShowSellerView = (seller) => {
    setSelectedSeller(seller)
    setShowSellerview(true);
  };
  
  const handleHideUserForm = () => {
    setShowUserForm(false);
    setSelectedUser(null);
  };
  const handleHideSellerView = () => {
    setShowSellerview(false);
    setSelectedSeller(null);
  };

  const handleSaveUser = (userData) => {
    console.log('User data:', userData);
    handleHideUserForm();
  };
  const handleValidSeller = (userData) => {
    console.log('User data:', userData);
    handleHideSellerView();
  };

  const handlePrevPage = () => {
    if (paginate?.current_page > 1) {
      setURL(paginate.prev_page_url);
    }
  };

  const handleNextPage = () => {
    if (paginate?.current_page < paginate?.last_page) {
      setURL(paginate.next_page_url);
    }
  };

  const handleAllSellectFalse = () =>{
    setManageSeller(false)
    setRoleBuyer(false)
    setRoleSeller(false)
  }

  const handlGetBuyers = () => {
    if(!rolebuyer){
      handleAllSellectFalse();
      setRoleBuyer(true);
    }
    setURL("http://127.0.0.1:8000/api/users?role=0")
  }
  const handlGetSeller = () => {
    if(!roleseller){
      handleAllSellectFalse();
      setRoleSeller(true);
    }
    setURL("http://127.0.0.1:8000/api/users?status=1&role=1");
  }
  const handlGetDisableSeller = () => {
    if (!manageSeller) {
      handleAllSellectFalse() ;
      setManageSeller(true);
    }
  }

  const handlDelete = async (id)=>{
    const response = await axios.delete(`http://127.0.0.1:8000/api/admin/users/${id}` , config)
    if (response.status === 200) {
      toast.success(response.data.message)
      updateeffect()
    }else{
      alert(response.data.message)
    }
  }
  const DeleteUser = (id , username) =>{ 
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete  ${username}'s account`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FB923C",
      cancelButtonColor: "#001C30",
      confirmButtonText: "Delete" ,
      customClass: {
        container: 'swal-container' ,
      }
    }).then((result) => {
      if (result.isConfirmed) {
        handlDelete(id);
      }
    });
  }
  const ValidSellerAccount = (id , username) =>{ 
    Swal.fire({
      title: "Are you sure?",
      text: `You want to Valide  ${username}'s seller account`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#FB923C",
      cancelButtonColor: "#001C30",
      confirmButtonText: "Valid" ,
      customClass: {
        container: 'swal-container' ,
      }
    }).then((result) => {
      if (result.isConfirmed) {
        handelValid(id)
      }
    });
  }

  const updateeffect =  () => {
    seteffect(!effect)
  }
 
  return (
    <div className='p-0'>
      <TopBar />
      <>
        <div>
        <Toaster width={100}  position='top-center'/>
          <Container>
            <div className="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
              <div className="bg-white-50 p-4">
              <ul className="nav justify-content-center">
                <li className="nav-item btns">
                <Button
                  className={roleseller ? "btn-sel active" : "btn-sel"}
                  onClick={handlGetSeller}
                >
                  Sellers
                </Button>
                </li>
                <li className="nav-item btns">
                <Button
                  className={rolebuyer ? "btn-sel active" : "btn-sel"}
                  onClick={handlGetBuyers}
                >
                  Buyers
                </Button>
                </li>
                <li className="nav-item btns">
                <Button
                 className={manageSeller ? "btn-sel active" : "btn-sel"}
                 onClick={handlGetDisableSeller}
                >
                  Manage Sellers
                </Button>
                </li>
              </ul>
              </div>
            </div>
            <nav className="navbar navbar-dark  rounded-1">
              <div className="container-fluid d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center justify-content-between">
                  <button 
                    className="navbar-toggler d-flex justify-content-between my-4" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarToggleExternalContent" 
                    aria-controls="navbarToggleExternalContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                    onClick={()=>setmenu(!menu)}>
                    <div className="d-flex align-items-center">
                      <span className='text-dark' >
                       {menu ? <MdClose className='fs-2'/> : <TbExchange  className='fs-2 '/>}
                      </span>
                      
                    </div>
                  </button>
                  <h1 className='ms-2 text-center text-dark'>User Category</h1>
                </div>
                
                <Button
                className='d-flex align-items-center new_patents rounded-4'
                onClick={() => handleShowNewBuyer()}
                >
                Create New <FaUserPlus className='ms-3 fs-3' />
                </Button>
              </div>
            </nav>
            <Form>
              <InputGroup className='my-3 '>
                {/* onChange for search */}
                <Form.Control
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search contacts'
                  className='p-2 px-4 fs-5 rounded-4 '
                />
              </InputGroup>
            </Form>
            <Table striped bordered hover >
              <thead className='mb-3 text-center '>
                {manageSeller ? 
                <tr>
                <th className='fs-5'>#</th>
                <th className=''>Photo</th>
                <th>Username</th>
                <th>Brand Logo</th>
                <th>Brand Name</th>
                <th>Email</th>
                <th>IS_Owner</th>
                <th>Action</th>
              </tr>
                 : 
                <tr>
                  <th className='fs-5'>#</th>
                  <th className=''>Photo</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
                }
              </thead>
              <tbody className='text-center'>
                {manageSeller ?  
                sellerDisabledData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className='col_image'>
                      {item.image ? (
                        <img className='image_buyer' src={`http://127.0.0.1:8000/storage/${item.image}`} alt="" />
                      ) : (
                        <FaUserCircle className='fs-3 text-center' />
                      )}
                    </td>
                    <td>{item.username}</td>
                    <td className=' '>
                      {item.brand_logo ? (
                        <img width={50} className='' src={`http://127.0.0.1:8000/storage/${item.brand_logo}`} alt="" />
                      ) : (
                        <FaUserCircle className='fs-3 text-center' />
                      )}
                      
                    </td>
                    <td>{item.brand_name}</td>
                    <td>{item.email ? item.email : 'Example@gmail.com'}</td>
                    <td>{item.is_owner ? item.is_owner : 'false'}</td>
                    <td className='d-flex justify-content-around btns rounded-0'>
                      <Button
                       className='btn-del'
                       onClick={()=>{ValidSellerAccount(item.id , item.username)} }
                      >Valid</Button>
                      <Button
                        className='btn-info'
                        onClick={() => {
                          handleShowSellerView(item);
                          console.log(item);
                        }}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))
                
               
                : usersData
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className='col_image'> {item.image? <img className='image_buyer' src={`http://127.0.0.1:8000/storage/${item.image}`} alt=""  />: <FaUserCircle className='fs-3 text-center'/> } </td>
                      <td>{item.username}</td>
                      <td>{item.email?item.email:'Example@gmail.com'}</td>
                      <td>{item.address?item.address:'null'}</td>
                      <td>{item.phone?item.phone:'null'}</td>

                      <td>{item.role?"Seller" : "Buyer"}</td>
                      <td className='d-flex justify-content-around btns rounded-0'>
                        <Button
                          className='btn-del '
                          onClick={() => DeleteUser(item.id , item.username)}
                        >
                          Delete
                        </Button>
                        <Button
                          className='btn-info'
                          onClick={() =>{ 
                            handleShowUserForm(item)
                          }}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Container>
          { manageSeller? "" :
          <div className="paginate">
            <button className={paginate?.current_page > 1? "btn_paginate  ":"btn_paginate desable"} onClick={handlePrevPage} >Prev</button>
            <div className="text">Page {paginate?.current_page} / {paginate?.last_page}  </div>
            <button className={paginate?.current_page < paginate?.last_page ?"btn_paginate":"btn_paginate desable"} onClick={handleNextPage} >Next</button>
          </div>
           }
        </div>
      </>
      <UserForm
        show={showUserForm}
        handleClose={handleHideUserForm}
        onSave={handleSaveUser}
        user={selectedUser}
        effect={updateeffect}
      />
      <Seller_view 
        show={showSellerview}
        handleClose={handleHideSellerView}
        onSave={handleValidSeller}
        seller={selectedSeller}
        effect={updateeffect}
      />
      <NewBuyer 
        show={ShowNewBuyer}
        handleClose={handleHideNewBuyer}
        onSave={handleSaveNewBuyer}
        effect={updateeffect}
      />
      
    </div>
  );
}

export default User;

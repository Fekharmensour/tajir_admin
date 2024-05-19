// UserForm.js
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./user.css";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { setRef } from "@mui/material";
import { Toaster, toast } from 'alert';
import Cookies from 'js-cookie';

const config= {
  headers: {
      'Authorization': `Bearer ${Cookies.get('token')}`
  }
};
const UserForm = (props) => {

  const [formData, setFormData] = useState({
    id: "",
    image:"",
    username: "",
    email: "",
    phone: '',
    address: '',
    password: "12qw12qw",
    password_confirmation:"12qw12qw" ,
    birthday:'',
  });

  useEffect(() => {
    if (props.user) {
      setFormData({
        id : props.user.id || '' ,
        username: props.user.username || "",
        email: props.user.email || "",
        image: props.user.image || '',
        phone: props.user.phone || '',
        password: "12qw12qw",
        password_confirmation : "12qw12qw" ,
        address : props.user.address || "" ,
        birthday : props.user.birthday || "" ,
      });
    }
  }, [props.user]);
  
  const handleSave = async (e) => {
    const data = {
      username :  formData.username,
      phone : formData.phone,
      address :formData.address ,
      birthday : formData.birthday,
      id : formData.id ,
    };
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/admin/userUpdate", data , config);
      if (response.status === 200) {
        toast.success(response.data.message)
         props.effect();
         props.user = null ;
      }
    } catch (error) {
      toast.error('Updated Has Wrong ')
      console.error("Error fetching data:", error);
    } finally {
      // Close the modal or handle any other post-submit actions
      props.handleClose();
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", formData);

      if (response.status === 201) {
        toast.success(response.data.message)
        props.effect();
      }
      
    } catch (error) {
      toast.error('Created Has Wrong ')
      console.error("Error fetching data:", error);
    } finally {
      props.handleClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

 
  
  

  return (
    <Modal 
      show={props.show} 
      onHide={props.handleClose} 
      className="px-5"
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {props.user ? 
           <div className="">
            {formData.image?
             <img className='me-2 image_buyer' width={50}   src={`http://127.0.0.1:8000/storage/${formData.image}`} alt=""  />:
             <FaUserCircle className='fs-2 me-3  text-center'/> } 
            {formData.username}
           </div>
            :
            "Create New User"
          }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className=" d-flex flex-column "
          onSubmit={() => {
            handleSave()
          }}
        >

          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Phone Number </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Birth Day </Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter your birthdayr"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
            />
          </Form.Group>
          {/* Add other form fields as needed */}

          <div className="btns d-flex justify-content-end">
            <Button
              type="submit"
              variant="primary"
              onClick={ handleSave }
              className="text-center btn-info "
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserForm;

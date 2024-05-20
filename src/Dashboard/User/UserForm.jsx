// UserForm.js
import React, { useState, useEffect , CSSProperties} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./user.css";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { setRef } from "@mui/material";
import { Toaster, toast } from 'alert';
import Cookies from 'js-cookie';
import MoonLoader from "react-spinners/MoonLoader";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const config= {
  headers: {
      'Authorization': `Bearer ${Cookies.get('token')}`
  }
};

const UserForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#FB923C");

  const [formData, setFormData] = useState({
    id: "",
    username: "",
    phone: '',
    address: '',
    birthday:'',
  });

  useEffect(() => {
    if (props.user) {
      setFormData({
        id : props.user.id || '' ,
        username: props.user.username || "",
        phone: props.user.phone || '',
        address : props.user.address || "" ,
        birthday : props.user.birthday || "" ,
      });
    }
  }, [props.user]);
  
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true)
    const data = {
      username :  formData.username,
      phone : formData.phone,
      address :formData.address ,
      birthday : formData.birthday,
      id : formData.id ,
    };
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/admin/userUpdate", data , config);
      if (response.status === 200) {
        toast.success(response.data.message)
        setLoading(false)
         props.effect();
         props.user = null ;
      }
    } catch (error) {
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
      <div className="sweet-loading">
        <MoonLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
        <Form
          className=" d-flex flex-column "
          onSubmit={handleSave}
        >

          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              defaultValue={formData.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              name="address"
              defaultValue={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Phone Number </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your Number"
              name="phone"
              defaultValue={formData.phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Birth Day </Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter your birthdayr"
              name="birthday"
              defaultValue={formData.birthday}
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

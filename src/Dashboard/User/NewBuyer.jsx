import React, { useState, useEffect , CSSProperties} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./user.css";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { setRef } from "@mui/material";
import { Toaster, toast } from 'alert';
import MoonLoader from "react-spinners/MoonLoader";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const NewBuyer = (props) => {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#FB923C");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: '',
        address: '',
        password: "12qw12qw",
        password_confirmation:"12qw12qw" ,
        birthday:'',
      });
      
      
      

      const handleCreate = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
          const response = await axios.post("http://127.0.0.1:8000/api/register",formData);
    
          if (response.status === 201) {
            toast.success('Buyer Created successfully ')
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
        Create New User
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
        onSubmit={() => {
          handleCreate()
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

        <div className="btns d-flex justify-content-end">
          <Button
            type="submit"
            variant="primary"
            onClick={ handleCreate }
            className="text-center btn-info "
          >
            Save
          </Button>
        </div>
      </Form>
    </Modal.Body>
  </Modal>
  )
}

export default NewBuyer

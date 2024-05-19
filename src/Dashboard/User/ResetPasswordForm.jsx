import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./user.css";
import axios from "axios";
import { Toaster, toast } from 'alert';
import Cookies from 'js-cookie';

const config= {
  headers: {
      'Authorization': `Bearer ${Cookies.get('token')}`
  }
};

const ResetPasswordForm = (props) => {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.new_password !== formData.new_password_confirmation) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/profile/resetPassword`,
        formData, 
        config
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        props.handleClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        className="px-5"
        style={{ minWidth: "900px !important" }}
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="oldPassword" className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control 
                type="password" 
                name="old_password" 
                value={formData.old_password} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
            <Form.Group controlId="newPassword" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control 
                type="password" 
                name="new_password" 
                value={formData.new_password} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control 
                type="password" 
                name="new_password_confirmation" 
                value={formData.new_password_confirmation} 
                onChange={handleChange} 
                required 
              />
            </Form.Group>
            <div className="btns d-flex justify-content-end">
              <Button variant="primary" type="submit" className="btn-del">
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ResetPasswordForm;

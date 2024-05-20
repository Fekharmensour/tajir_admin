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

const ImageForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#FB923C");
    const [formData, setFormData] = useState({
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
          setFormData({ ...formData, image: files[0] });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const form = new FormData();
        form.append("text", formData.text);
        if (formData.image) {
          form.append("image", formData.image);
        }
        handlupdate( form)
      };
    
      const handlupdate = async (form ) => {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/profile/updateImage`,
          form , 
          config
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          props.effect();
          props.handleClose();
          setLoading(false)
        } else {
          alert(response.data.message);
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
          <Modal.Title>Update Photo Profile</Modal.Title>
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
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image update</Form.Label>
              <Form.Control type="file" name="image" onChange={handleChange} />
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
  )
}

export default ImageForm

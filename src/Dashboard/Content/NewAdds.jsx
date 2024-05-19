import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "../User/user.css";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import axios from "axios";
import { Toaster, toast } from "alert";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
};
const NewAdds = (props) => {
    const [formData, setFormData] = useState({
        id: "",
        image: null,
        text: "",
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
        const form = new FormData();
        form.append("text", formData.text);
        if (formData.image) {
          form.append("image", formData.image);
        }
        handlupdate( form)
      };
    
      const handlupdate = async (form ) => {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/admin/ads`,
          form , 
          config
        );
        if (response.status === 201) {
          toast.success(response.data.message);
          props.effect();
          props.handleClose();
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
          <Modal.Title>Create new Ad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image update</Form.Label>
              <Form.Control type="file" name="image" onChange={handleChange} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="text"
                value={formData.text}
                onChange={handleChange}
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
  )
}

export default NewAdds

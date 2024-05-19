import React, { useState , useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import  "../User/user.css";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import axios from "axios";
import { Toaster, toast } from 'alert';
import Cookies from 'js-cookie';

const config= {
  headers: {
      'Authorization': `Bearer ${Cookies.get('token')}`
  }
};

const BuyerForm = (props) => {
    const [formData, setFormData] = useState({
        'id':'' ,
        "complainer_username": "",
        "complainer_id" :"",
        "complainer_email": "",
        "title": "",
        "body": "",
        "buyer_id": "",
        "buyer_username": "" ,
        "buyer_email" :''
      });
    
      useEffect(() => {
        if (props.buyerData) {
          setFormData({
            id : props.buyerData.id || '' ,
            complainer_username : props.buyerData.complainer_username || '' ,
            complainer_id: props.buyerData.complainer_id || "",
            complainer_email: props.buyerData.complainer_email || "",
            title: props.buyerData.title || '',
            body: props.buyerData.body || '',
            buyer_id : props.buyerData.buyer_id || "" ,
            buyer_username : props.buyerData.buyer_username || "" ,
            buyer_email: props.buyerData.buyer_email || '' 
          });
        }
      }, [props.buyerData]);

      const DeleteBuyer = (id, com , username) => {
        Swal.fire({
          title: "Are you sure?",
          text: `You want to delete  ${username}'s account`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#FB923C",
          cancelButtonColor: "#001C30",
          confirmButtonText: "Delete",
          customClass: {
            container: "swal-container",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            handlDelete(id, com);
          }
        });
      };
      const handlDelete = async (id, com) => {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/admin/complaint/buyer/${id}/${com}` , config
        );
        if (response.status === 200) {
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
    >
      <Modal.Header closeButton>
        <Modal.Title>Buyer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row mt-3">
          <div className="col-md-12">
            <h5 className="text-center mb-2">buyer Details</h5>
            <p>
              <strong className="me-2">Title:</strong> {formData.title}
            </p>
            <p>
              <strong className="me-2">Body:</strong> {formData.body}
            </p>
            <p>
              <strong className="me-2">Username Complained_About:</strong>
              {formData.buyer_username}
            </p>
            <p>
              <strong className="me-2">Email Complained_About::</strong> {formData.buyer_email}
            </p>
          </div>
          <div className="col-md-12">
            <h5 className="text-center mb-2">Complainer Details</h5>
            <p>
              <strong>Username:</strong> {formData.complainer_username}
            </p>
            <p>
              <strong>Email:</strong> {formData.complainer_email}
            </p>
          </div>
          <div className="btns mt-5 d-flex justify-content-end">
            <button
              className="btn-info px-3"
              onClick={() => DeleteBuyer(formData.buyer_id , formData.id , formData.buyer_username)}
            >
              Delete Buyer
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
    </div>
  )
}

export default BuyerForm

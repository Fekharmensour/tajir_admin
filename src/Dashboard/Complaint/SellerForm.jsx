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

const SellerForm = (props) => {

    const [formData, setFormData] = useState({
        'id':'' ,
        "complainer_username": "",
        "complainer_id" :"",
        "complainer_email": "",
        "title": "",
        "body": "",
        "seller_id": "",
        "seller_username": "" ,
        "seller_email" :'' ,
        'brand' : '' ,
      });
    
      useEffect(() => {
        if (props.sellerData) {
          setFormData({
            id : props.sellerData.id || '' ,
            complainer_username : props.sellerData.complainer_username || '' ,
            complainer_id: props.sellerData.complainer_id || "",
            complainer_email: props.sellerData.complainer_email || "",
            title: props.sellerData.title || '',
            body: props.sellerData.body || '',
            seller_id : props.sellerData.seller_id || "" ,
            seller_username : props.sellerData.seller_username || "" ,
            seller_email: props.sellerData.seller_email || '' ,
            brand : props.sellerData.brand || '' ,
          });
        }
      }, [props.sellerData]);
      
      const DisableSeller = (id, com , username) => {
        Swal.fire({
          title: "Are you sure?",
          text: `You want to Disable ${username}'s Seller Account `,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#FB923C",
          cancelButtonColor: "#001C30",
          confirmButtonText: "Disable",
          customClass: {
            container: "swal-container",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            handlDisable(id, com);
          }
        });
      };
      const handlDisable = async (id, com) => {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/admin/complaint/seller/${id}/${com}` , config
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
              {formData.seller_username}
            </p>
            <p>
              <strong className="me-2">Email Complained_About::</strong> {formData.seller_email}
            </p>
            <p>
              <strong className="me-2">Brand :</strong> {formData.brand}
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
              onClick={() => DisableSeller(formData.seller_id , formData.id , formData.seller_username)}
            >
              Disable Seller
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
    </div>
  )
}

export default SellerForm

import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "../User/user.css";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import axios from "axios";
import { Toaster, toast } from "alert";
import Cookies from 'js-cookie';

const config= {
  headers: {
      'Authorization': `Bearer ${Cookies.get('token')}`
  }
};

const ReviewForm = (props) => {
  const [formData, setFormData] = useState({
    id: "",
    complainer_username: "",
    complainer_id: "",
    complainer_email: "",
    title: "",
    body: "",
    name_product: "",
    image_product: "",
    price: "",
    content_review: "",
    rating: "",
    writer_review_id: "",
    writer_review_name: "",
    review_id: "",
  });

  useEffect(() => {
    if (props.reviewData) {
      setFormData({
        id: props.reviewData.id || "",
        complainer_username: props.reviewData.complainer_username || "",
        complainer_id: props.reviewData.complainer_id || "",
        complainer_email: props.reviewData.complainer_email || "",
        title: props.reviewData.title || "",
        body: props.reviewData.body || "",
        name_product: props.reviewData.name_product || "",
        image_product: props.reviewData.image_product || "",
        price: props.reviewData.price || "",
        content_review: props.reviewData.content_review || "",
        rating: props.reviewData.rating || "",
        writer_review_id: props.reviewData.writer_review_id || "",
        writer_review_name: props.reviewData.writer_review_name || "",
        review_id: props.reviewData.review_id || "",
      });
    }
  }, [props.reviewData]);

  const DeleteReview = (id, com) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete Review`,
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
      `http://127.0.0.1:8000/api/admin/complaint/review/${id}/${com}` , config
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
    <Modal
      show={props.show}
      onHide={props.handleClose}
      className="px-5"
      style={{ minWidth: "900px !important" }}
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-12">
            <h5 className="text-center">Review Details</h5>
            <p>
              <strong className="me-2">Title:</strong> {formData.title}
            </p>
            <p>
              <strong className="me-2">Body:</strong> {formData.body}
            </p>
            <p>
              <strong className="me-2">Name of Product:</strong>{" "}
              {formData.name_product}
            </p>
            <p>
              <strong className="me-2">Price:</strong> {formData.price}
            </p>
            <p>
              <strong className="me-2">Review Content:</strong>{" "}
              {formData.content_review}
            </p>
            <p>
              <strong className="me-2">Rating:</strong> {formData.rating} Of 5{" "}
            </p>
            <p>
              <strong className="me-2">Written By:</strong>{" "}
              {formData.writer_review_name}
            </p>
          </div>
          <div className="col-md-12">
            <h5 className="text-center">Complainer Details</h5>
            <p>
              <strong>Username:</strong> {formData.complainer_username}
            </p>
            <p>
              <strong>Email:</strong> {formData.complainer_email}
            </p>
          </div>
          <div className="btns d-flex justify-content-end">
            <button
              className="btn-info px-3"
              onClick={() => DeleteReview(formData.review_id, formData.id)}
            >
              {" "}
              Delete Review{" "}
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewForm;

// UserForm.js
import React, { useState , useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import '../User/user.css';
import bgSeller from './../../assets/Bg_Seller.jpg';
import axios from "axios";
import { Toaster, toast } from 'alert';
import Cookies from 'js-cookie';

const config= {
  headers: {
      'Authorization': `Bearer ${Cookies.get('token')}`
  }
};

const Seller_view = (props) => {
  

    const [formData, setFormData] = useState({
        id: "",
        image:"",
        username: "",
        email: "",
        phone: '',
        address: '',
        isOwner: '' ,
        birthday:'',
        brand_logo : '' ,
        brand_name : '' ,
        commercialRecord: '' ,
      });
    
      useEffect(() => {
        if (props.seller) {
          setFormData({
            id : props.seller.id || '' ,
            username: props.seller.username || "",
            email: props.seller.email || "",
            image: props.seller.image || '',
            phone: props.seller.phone || '',
            address : props.seller.address || "" ,
            birthday : props.seller.birthday || "" ,
            commercialRecord: props.seller.commercialRecord || null,
            brand_logo: props.seller.brand_logo || null ,
            brand_name : props.seller.brand_name || null ,
            isOwner : props.seller.is_owner ||  false 
          });
        }
      }, [props.seller]);
      


    const handelValid = async () => {
        try{
          
            const response = await axios.put(`http://127.0.0.1:8000/api/admin/validSeller/${formData.id}`, {} , config)
            if (response.status === 200) {
                toast.success(response.data.message);
                props.effect()
                props.handleClose()
            }  
        }catch(err){
            console.error(err.message);
        };
    }
    const ValidSellerAccount = () =>{ 
        Swal.fire({
          title: "Are you sure?",
          text: `You want to Valide  ${formData.username}'s seller account`,
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
            handelValid()
          }
        });
      }

      const handelReject = async () => {
        try{
            const response = await axios.put(`http://127.0.0.1:8000/api/admin/rejectSeller/${formData.id}`,{},config)
            if (response.status === 200) {
              toast.success(response.data.message);
                props.effect()
                props.handleClose()
            }  
        }catch(err){
            console.error(err.message);
        };
    }
    const RejectSellerAccount = () =>{ 
        Swal.fire({
          title: "Are you sure?",
          text: `You want to reject  ${formData.username}'s seller account`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#FB923C",
          cancelButtonColor: "#001C30",
          confirmButtonText: "Reject" ,
          customClass: {
            container: 'swal-container' ,
          }
        }).then((result) => {
          if (result.isConfirmed) {
            handelReject()
          }
        });
      }


  return (
    <Modal 
      show={props.show} 
      onHide={props.handleClose}  
      className="px-5" 
      style={{ minWidth: '900px !important' }}
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Seller Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <section className="">
    <div className="container text-center">
        <div className="row">
            <div className="col-lg-12 mb-4 mb-sm-5">
                <div className=" border-0">
                    <div className=" p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                        <div className="row align-items-center">
                            <div className="col-12 image_account" >
                                 {formData.brand_logo?<img className="bg" src={`http://127.0.0.1:8000/storage/${formData.brand_logo}`} width={100}  alt="" /> : <img className="bg" src={bgSeller} width={100}  alt="" />}
                                {formData.image?<img className="profile" src={`http://127.0.0.1:8000/storage/${formData.image}`} width={150} alt="..."/>
                                :<img className="profile" src="https://bootdey.com/img/Content/avatar/avatar7.png" width={150} alt="..."/>}
                            </div>
                            <div className="col-12">
                                <div className="userprofile ">
                                    <h4 className="mt-2">{formData.username}</h4>
                                </div>
                                <ul className="list-unstyled information mb-1-9">
                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Brand:</span> {formData.brand_name}</li>
                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Age:</span> {formData.birthday?formData.birthday:"NULL"}</li>
                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Email:</span> {formData.email}</li>
                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Address:</span> {formData.address?formData.address:"NULL"}</li>
                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Phone:</span> {formData.phone?formData.phone:"NULL"}</li>
                                    <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">IS_Owner:</span> {formData.isOwner?"True":"False"}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="pdf text-start">
            <h5># Commercial Record</h5>
            <iframe src={`http://127.0.0.1:8000/storage/${formData.commercialRecord}`}  width="100%" height="300px"></iframe>
        </div>
    </div>
</section>
<div className="d-flex justify-content-end">
    <div className="btns">
    <Button className='btn-del me-3 '
    onClick={RejectSellerAccount}
        >
            Reject
        </Button>
    <Button
        className='btn-info'
        onClick={ValidSellerAccount}
        >
        Valid
    </Button>
    </div>
</div>
      </Modal.Body>
    </Modal>
  );
};

export default Seller_view;
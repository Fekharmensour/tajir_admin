import React, { useState, useEffect , CSSProperties} from "react";
import TopBar from "../TopBar";
import { FaStar } from "react-icons/fa";
import { TfiLayoutListThumbAlt } from "react-icons/tfi";
import { MdClose } from "react-icons/md";
import "../User/user.css";
import { FaUserCircle } from "react-icons/fa";
import { PiLegoSmileyFill } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import axios from "axios";
import ReviewForm from "../Complaint/ReviewForm";
import { Toaster, toast } from 'alert';
import BuyerForm from "../Complaint/BuyerForm";
import { TbExchange } from "react-icons/tb";
import { Container } from "react-bootstrap";
import ProductForm from "../Complaint/ProductForm";
import SellerForm from "../Complaint/SellerForm";
import Cookies from 'js-cookie';
import AddsForm from "../Content/AddsForm";
import { AiFillPlusCircle } from "react-icons/ai";
import NewAdds from "../Content/NewAdds";
import Table from 'react-bootstrap/Table';
import { FcShop } from "react-icons/fc";
import CouponForm from "../Content/CouponForm";
import { SiTrueup } from "react-icons/si";
import MoonLoader from "react-spinners/MoonLoader";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const config = {
  headers: {
      'Authorization': `Bearer ${Cookies.get('token')}`
  }
};

const Coupon = () => {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#FB923C");
  const [coupon , setCoupon] = useState(true);
  const [adds , setAdds] = useState(false);
  const [effect , seteffect] = useState(false);
  const [menu, setmenu] = useState(false);
  const [couponData , SetCouponData]  = useState([]);
  const [addsData , SetAddsData]  = useState([]);
  const [selectAd , Setselectad]  = useState(null);
  const [selectCoupon , SetselectCoupon]  = useState(null);
  const [showFormAdds , SetShowFormAdds]  = useState(false);
  const [showFormNewAdds , SetShowFormNewAdds]  = useState(false);
  const [showFormCoupon , SetShowFormCoupon]  = useState(false);

  const fetchAddsData = async () => {
    try {
      setLoading(true)
      const response = await axios.get( 'http://127.0.0.1:8000/api/admin/ads', config);
      if (response.status === 200) {
        SetAddsData(response.data.ads); 
        setLoading(false)
      } else {
        console.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const fetchCouponData = async () => {
    try {
      setLoading(true)
      const response = await axios.get( 'http://127.0.0.1:8000/api/admin/coupon', config);
      if (response.status === 200) {
        SetCouponData(response.data.coupons); 
        setLoading(false)
      } else {
        console.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchAddsData()
    fetchCouponData()
  }, []);

  useEffect(() => {
    fetchAddsData()
    fetchCouponData()
  }, [effect]);

  const handlGetcoupon = () => {
    handelAllFalse();
    setCoupon(true);
    updateeffect()
  };
  const handlGetadds = () => {
    handelAllFalse();
    setAdds(true);
    updateeffect()
  };
  const updateeffect =() => {
    seteffect(!effect)
  }
  const handelAllFalse = () => {
    setCoupon(false);
    setAdds(false);
  }
  const DeleteAds = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You Want To Delete This Ads`,
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
        handlDeleteAds(id);
      }
    });
  };
  const handlDeleteAds = async (id) => {
    setLoading(true)
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/admin/ads/delete/${id}` , config
    );
    if (response.status === 200) {
      toast.success(response.data.message);
      updateeffect()
      setLoading(false)
    } else {
      alert(response.data.message);
    }
  };
  const DeleteCoupon = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You Want To Delete This Coupon`,
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
        handlDeleteCoupon(id);
      }
    });
  };
  const handlDeleteCoupon = async (id) => {
    setLoading(true)
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/admin/coupon/delete/${id}` , config
    );
    if (response.status === 200) {
      toast.success(response.data.message);
      updateeffect()
      setLoading(false)
    } else {
      alert(response.data.message);
    }
  };
  const array = [
      {
          "id": 2,
          "coupon": "hail40",
          "percentage": "40.0",
          "dateE": "2024-05-22",
          "brand_name": "mensour",
          "brand_id": 4,
          "brand_image": "brand_logos/uppN0UEuzYLZGDOWDrOESrPnzQMsZi1fiAYnugGs.jpg"
      },
      {
          "id": 3,
          "coupon": "mens20",
          "percentage": "25.0",
          "dateE": "2024-05-18",
          "brand_name": "Lenovo",
          "brand_id": 6,
          "brand_image": "brand_logos/5tGL9gyPiIavd98d2htXtUes2dQ36bkg2iVBlbPg.gif"
      }
  ]
  const renderAdds = (array)=>{
    if (!Array.isArray(array) || array.length === 0) {
      return <p className="text-center mt-5 fs-5"><PiLegoSmileyFill className="fs-3 me-2"/> Ads-Free </p>;
    }
    return array.map((e, index) => (

      <div key={index} className="col-lg-4 col-md-4 col-sm-6 mb-4 card pb-2 rounded-4" style={{ minWidth: "350px", minHeight: "120px" }}>
        <div className="card-body" style={{ width: "100%" }}>
          <h5 className="card-title ">
            <img src={`http://127.0.0.1:8000/storage/${e.image}`} style={{width:"100%"}} />
          </h5>
          <h6 className="text-black-50">
             {e.text}
          </h6>
          <div className="btns d-flex justify-content-center">
            <button 
              className="btn-del me-2 px-2"
              onClick={() => DeleteAds(e.id)}
            >Delete</button>
            <button 
              className="btn-info px-2"
              onClick={()=>{
                handleShowFormAdds(e)
              }}
            >Update</button>
          </div>
        </div>
      </div>
    ));
  }

  const renderCoupon = (array) => {
    if (!Array.isArray(array) || array.length === 0) {
      return <p className="text-center fs-5">Coupon-Free ...!</p>;
    }
  
    return array.map((e, index) => {
      const formattedDate = e.dateE ? new Date(e.dateE).toISOString().split('T')[0] : 'N/A';
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td className='col_image'>
            {e.brand_image ? (
              <img className='image_buyer' src={`http://127.0.0.1:8000/storage/${e.brand_image}`} alt="" />
            ) : (
              <FcShop className='fs-3 text-center' />
            )}
          </td>
          <td>{e.brand_name}</td>
          <td>{e.coupon}</td>
          <td>{e.percentage}%</td>
          <td>{formattedDate}</td>
          <td className='d-flex justify-content-around btns rounded-0'>
            <Button
              className='btn-del'
              onClick={() => DeleteCoupon(e.id)}
            >Delete</Button>
          </td>
        </tr>
      );
    });
  };
  

  const handleHideAddsForm = () => {
    SetShowFormAdds(false);
    Setselectad(null);
  };
  const handleSaveFormAdds = () => {
    handleHideAddsForm();
  }
  const handleShowFormAdds = (e)=>{
    Setselectad(e)
    SetShowFormAdds(true)
  }
  const handleHideNewAddsForm = () => {
    SetShowFormNewAdds(false);
  };
  const handleHideFormCoupon = () => {
    SetShowFormCoupon(false);
  };
  const handleSaveNewAdds = () => {
    handleHideAddsForm();
  }
  const handleSaveCoupn = () =>{
    handleHideFormCoupon()
  }

  return (
    <div>
        <TopBar />
        <Container>
        <Toaster width={100}  position='top-center'/>
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
      <div
        className="collapse"
        id="navbarToggleExternalContent"
        data-bs-theme="dark"
      >
        <div className="bg-white-50 p-4">
          <ul className="nav justify-content-center">
            <li className="nav-item btns">
              <Button
                className={coupon ? "btn-sel active" : "btn-sel"}
                onClick={handlGetcoupon}
              >
                Coupon
              </Button>
            </li>
            <li className="nav-item btns">
              <Button
                className={adds ? "btn-sel active" : "btn-sel"}
                onClick={handlGetadds}
              >
                Ads
              </Button>
            </li>
          </ul>
        </div>
      </div>
      <nav className="navbar navbar-dark  rounded-1 mt-2 ms-3">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center justify-content-between">
            <button
              className="navbar-toggler d-flex justify-content-between my-4"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setmenu(!menu)}
            >
              <div className="d-flex"></div>
              <div className="d-flex align-items-center">
                <span className="text-dark">
                  {menu ? (
                    <MdClose className="fs-2" />
                  ) : (
                    <TbExchange  className="fs-2 " />
                  )}
                </span>
              </div>
            </button>
            <h2 className="text-center text-dark">{adds?"Ads":"Coupon"}</h2>
          </div>
              <Button
                className='d-flex align-items-center new_patents rounded-4'
                onClick={adds? () => SetShowFormNewAdds(true) : ()=> SetShowFormCoupon(true) }
                >
                 <AiFillPlusCircle className='fs-3 me-2' />Create New
              </Button>
        </div>
      </nav>
      <div className="row align-items-center gap-4 d-flex justify-content-center">
        {adds && renderAdds(addsData)}
        {coupon &&
            <Table striped bordered hover >
              <thead className='mb-3 text-center '>
                <tr>
                  <th className='fs-5'>#</th>
                  <th className=''>Logo</th>
                  <th>Brand</th>
                  <th>Coupon</th>
                  <th>Percentage</th>
                  <th>DateExpire</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                { renderCoupon(couponData) }
              </tbody>
            </Table>}
      </div>
      </Container>
      <AddsForm 
        show={showFormAdds}
        handleClose={handleHideAddsForm}
        onSave={handleSaveFormAdds}
        adData={selectAd}
        effect = {updateeffect}
      />
      <NewAdds 
        show={showFormNewAdds}
        handleClose={handleHideNewAddsForm}
        onSave={handleSaveNewAdds}
        effect = {updateeffect}
      />
      <CouponForm 
        show={showFormCoupon}
        handleClose={handleHideFormCoupon}
        onSave={handleSaveCoupn}
        effect = {updateeffect}
      />
    </div>
  )
}

export default Coupon

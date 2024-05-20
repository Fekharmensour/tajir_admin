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


function Star(rating) {
  const Render_Start = () => {
    let co = 0;
    let Stars = [];
    const nbr1 = Math.floor(rating);
    for (let i = 0; i < nbr1; i++) {
      Stars.push(
        <span style={{ color: "gold" }}>
          <FaStar className="me-2" />
        </span>
      );
      co++;
    }
    for (let i = co; i < 5; i++) {
      Stars.push(
        <span style={{ color: "#ccc" }}>
          <FaStar className="me-2" />
        </span>
      );
    }

    return Stars;
  };
  return <div>{Render_Start()}</div>;
}

const Complaint = () => {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#FB923C");
  const [menu, setmenu] = useState(false);
  const [buyer, setViewBuyer] = useState(false);
  const [seller, setViewSeller] = useState(false);
  const [product, setViewProduct] = useState(false);
  const [review, setViewReview] = useState(true);
  const [ effect , seteffect ]= useState(false)
  const [ReviewData , SetReviewData]  = useState([]);
  const [BuyerData , SetBuyerData]  = useState([]);
  const [ProductData , SetProuductData]  = useState([]);
  const [SellerData , SetSellerData]  = useState([]);
  const [showReviewForm , SetshowReviewForm]  = useState(false);
  const [showBuyerForm , SetshowBuyerForm]  = useState(false);
  const [showSellerForm , SetshowSellerForm]  = useState(false);
  const [showProductForm , SetshowProductForm]  = useState(false);
  const [selectReview , SetselectReview]  = useState(null);
  const [selectBuyer , SetselectBuyer]  = useState(null);
  const [selectSeller , SetselectSeller]  = useState(null);
  const [selectProduct , SetselectProduct]  = useState(null);

  const fetchReviewData = async () => {
    try {
      setLoading(true)
      const response = await axios.get( 'http://127.0.0.1:8000/api/admin/complaint/reviews', config);
      if (response.status === 200) {
        SetReviewData(response.data.data); 
        setLoading(false)
      } else {
        console.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const fetchProductData = async () => {

    try {
      setLoading(true)
      const response = await axios.get( 'http://127.0.0.1:8000/api/admin/complaint/products', config);
      if (response.status === 200) {
        SetProuductData(response.data.data); 
        setLoading(false)
      } else {
        console.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const fetchBuyerData = async () => {
    try {
      setLoading(true)
      const response = await axios.get( 'http://127.0.0.1:8000/api/admin/complaint/buyers', config);
      if (response.status === 200) {
        SetBuyerData(response.data.data); 
        setLoading(false)
      } else {
        console.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const fetchSellerwData = async () => {
    try {
      setLoading(true)
      const response = await axios.get( 'http://127.0.0.1:8000/api/admin/complaint/sellers', config);
      if (response.status === 200) {
        SetSellerData(response.data.data); 
        setLoading(false)
      } else {
        console.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchReviewData();
    fetchProductData();
    fetchBuyerData();
    fetchSellerwData();
  }, [effect]);
  useEffect(() => {
    fetchReviewData();
    fetchProductData();
    fetchBuyerData();
    fetchSellerwData();
  }, []);

  const DeleteComplait = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You Want To Delete This Complaint`,
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
        handlDelete(id);
      }
    });
  };
  const handlDelete = async (id) => {
    setLoading(true)
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/admin/complaint/${id}` , config
    );
    if (response.status === 200) {
      toast.success(response.data.message);
      updateeffect()
      setLoading(false)
    } else {
      alert(response.data.message);
    }
  };
  const handleHideReviewForm = () => {
    SetshowReviewForm(false);
    SetselectReview(null);
  };
  const handleSaveReview = () => {
    handleHideReviewForm();
  }
  const handleHideBuyerForm = () => {
    SetshowBuyerForm(false);
    SetselectBuyer(null);
  };
  const handleSaveBuyer = () => {
    handleHideBuyerForm();
  }
  const handleHideSellerForm = () => {
    SetshowSellerForm(false);
    SetselectSeller(null);
  };
  const handleSaveSeller = () => {
    handleHideSellerForm();
  }
  const handleHideProductForm = () => {
    SetshowProductForm(false);
    SetselectProduct(null);
  };
  const handleSaveProduct = () => {
    handleHideSellerForm();
  }
  const handelAllFalse = () => {
    setViewBuyer(false);
    setViewSeller(false);
    setViewProduct(false);
    setViewReview(false);
  };
  const handlGetReview = () => {
    handelAllFalse();
    setViewReview(true);
    updateeffect()
  };
  const handlGetProduct = () => {
    handelAllFalse();
    setViewProduct(true);
    updateeffect()
  };
  const handlGetBuyer = () => {
    handelAllFalse();
    setViewBuyer(true);
    updateeffect()
  };
  const handlGetSeller = () => {
    handelAllFalse();
    setViewSeller(true);
    updateeffect()
  };
  const renderReviewCards = (array) => {
    if (!Array.isArray(array) || array.length === 0) {
      return <p className="text-center mt-5 fs-5"><PiLegoSmileyFill className="fs-3 me-2"/> Complaint-Free </p>;
    }
    return array.map((e, index) => (

      <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4 card pb-2 ps-2 rounded-4" style={{ minWidth: "350px", minHeight: "120px" }}>
        <div className="card-body" style={{ width: "100%" }}>
          <h5 className="card-title">
            <FaUserCircle className="fs-3 text-center me-3" /> {e.complainer_username}
          </h5>
          <h4>{e.title.length > 15 ? `${e.title.substring(0, 15)}...` : e.title}</h4>
          <h6 className="text-black-50">
            {e.body.length > 120 ? `${e.body.substring(0, 120)}...` : e.body}
          </h6>
          <div className="btns d-flex justify-content-center">
            <button 
              className="btn-del me-2 px-2"
              onClick={() => DeleteComplait(e.id)}
            >Delete</button>
            <button 
              className="btn-info px-2"
              onClick={()=>{
                handelShowForm(e)
              }}
            >More</button>
          </div>
        </div>
      </div>
    ));
  };
  const updateeffect =  () => {
    seteffect(!effect)
  }
  const handelShowForm = (data) => {
    if (data.about == 'review') {
      handleShowReviewView(data)
    }
    if (data.about == 'product') {
      handleShowProductView(data)
    }
    if (data.about == 'buyer') {
      handleShowBuyerView(data)
    }
    if (data.about == 'seller') {
      handleShowSellerView(data)
    }
  }
  

  const handleShowReviewView = (data) => {
    SetselectReview(data)
    SetshowReviewForm(true);
  };
  const handleShowBuyerView = (data) => {
    SetselectBuyer(data)
    SetshowBuyerForm(true);
  };
  const handleShowSellerView = (data) => {
    SetselectSeller(data)
    SetshowSellerForm(true);
  };
  const handleShowProductView = (data) => {
    SetselectProduct(data)
    SetshowProductForm(true);
  };

  return (
    <div>
      <TopBar />
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
      <Container>
      <div
        className="collapse"
        id="navbarToggleExternalContent"
        data-bs-theme="dark"
      >
        <div className="bg-white-50 p-4">
          <ul className="nav justify-content-center">
            <li className="nav-item btns">
              <Button
                className={review ? "btn-sel active" : "btn-sel"}
                onClick={handlGetReview}
              >
                Review
              </Button>
            </li>
            <li className="nav-item btns">
              <Button
                className={product ? "btn-sel active" : "btn-sel"}
                onClick={handlGetProduct}
              >
                Product
              </Button>
            </li>
            <li className="nav-item btns">
              <Button
                className={buyer ? "btn-sel active" : "btn-sel"}
                onClick={handlGetBuyer}
              >
                Buyer
              </Button>
            </li>
            <li className="nav-item btns">
              <Button
                className={seller ? "btn-sel active" : "btn-sel"}
                onClick={handlGetSeller}
              >
                Seller
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
            <h2 className="text-center text-dark">Complaint Category</h2>
          </div>
        </div>
      </nav>
      <div className="row align-items-center gap-4 d-flex justify-content-center">
        { review &&  renderReviewCards(ReviewData)  }
        { product && renderReviewCards(ProductData) }
        { seller && renderReviewCards(SellerData) }
        { buyer && renderReviewCards(BuyerData) }
      </div>
      </Container>
      

      <ReviewForm 
        show={showReviewForm}
        handleClose={handleHideReviewForm}
        onSave={handleSaveReview}
        reviewData={selectReview}
        effect = {updateeffect}
      />
      <BuyerForm 
        show={showBuyerForm}
        handleClose={handleHideBuyerForm}
        onSave={handleSaveBuyer}
        buyerData={selectBuyer}
        effect = {updateeffect}
      />
      <SellerForm 
        show={showSellerForm}
        handleClose={handleHideSellerForm}
        onSave={handleSaveSeller}
        sellerData={selectSeller}
        effect = {updateeffect}
      />
      <ProductForm 
          show={showProductForm}
          handleClose={handleHideProductForm}
          onSave={handleSaveProduct}
          productData={selectProduct}
          effect = {updateeffect}
      />
    </div>
  );
};

export default Complaint;

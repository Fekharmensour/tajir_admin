import React, { useState, useEffect , CSSProperties} from "react";
import Modal from "react-bootstrap/Modal";
import "../User/user.css";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
import { Toaster, toast } from "alert";
import MoonLoader from "react-spinners/MoonLoader";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
};

const CouponForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#FB923C");
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    brand_id: "",
    coupon: "",
    percentage: "",
    dateE: null,
  });

  const fetchBrandsData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/brand/getBrands"
      );
      if (response.status === 200) {
        setBrands(response.data.brands);
      } else {
        console.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching brand data:", error);
    }
  };

  useEffect(() => {
    fetchBrandsData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    console.log(formData);
    const response = await axios.post(
      `http://127.0.0.1:8000/api/admin/coupon`,
      formData , 
      config
    );
    if (response.status === 201) {
      toast.success(response.data.message);
      setLoading(false)
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
          <Modal.Title>Create new Coupon</Modal.Title>
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
            <Form.Group controlId="formBrand" className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Select
                name="brand_id"
                value={formData.brand_id}
                onChange={handleChange}
                aria-label="Select Brand"
                required
              >
                <option value="">Select a brand</option>
                {brands.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formCoupon" className="mb-3">
              <Form.Label>Coupon</Form.Label>
              <Form.Control
                type="text"
                name="coupon"
                value={formData.coupon}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPercentage" className="mb-3">
              <Form.Label>Percentage</Form.Label>
              <Form.Control
                type="number"
                name="percentage"
                value={formData.percentage}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDateE" className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                name="dateE"
                value={formData.dateE}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="btns d-flex justify-content-end">
              <Button variant="primary" type="submit" className="btn-del">
                Create Coupon
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CouponForm;

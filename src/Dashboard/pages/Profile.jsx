import React, { useContext, useEffect, useState, CSSProperties } from "react";
import TopBar from "../TopBar";
import "../../styling/profile.css";
import { RiImageEditFill } from "react-icons/ri";
import { Toaster, toast } from "alert";
import Cookies from "js-cookie";
import axios from "axios";
import UserForm from "../User/UserForm";
import ImageForm from "../User/ImageForm";
import ResetPasswordForm from "../User/ResetPasswordForm";
import AuthContext_Dashbord from "../../context/AuthContext_Dashbord";
import MoonLoader from "react-spinners/MoonLoader";
const config = {
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
};
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const Profile = () => {
  const { User, effect, SetEffect } = useContext(AuthContext_Dashbord);
  const [user, setuser] = useState(User);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#FB923C");

  const fetchuser = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/profile",
        config
      );
      if (response.status === 200) {
        setuser(response.data.buyer);
        SetEffect();
      } else {
        console.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchuser();
  }, []);
  useEffect(() => {
    fetchuser();
  }, [effect]);
  const handleHideUserForm = () => {
    setShowUserForm(false);
  };
  const handleSaveUser = () => {
    handleHideUserForm();
  };
  const handleHideImageForm = () => {
    setShowImageForm(false);
  };
  const handleSaveImage = () => {
    handleHideImageForm();
  };
  const handleHideResetPassword = () => {
    setShowResetPassword(false);
  };
  const handleSaveResetPassword = () => {
    handleHideResetPassword();
  };
  const updateeffect = () => {
    SetEffect();
  };
  return (
    <div>
      <TopBar />
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
      <div className="container mt-5">
        <Toaster width={100} position="top-center" />
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3 ">
              <div className="card py-3 rounded-4">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center pt-5">
                    <img
                      src={
                        user.image
                          ? `http://127.0.0.1:8000/storage/${user.image}`
                          : "https://bootdey.com/img/Content/avatar/avatar7.png"
                      }
                      alt="Admin"
                      className="rounded-circle"
                      width="100"
                      height={100}
                    />
                    <div className="mt-3">
                      <h4>{user.username}</h4>
                      <p className="text-secondary ">{user.email}</p>
                    </div>
                    <div className="col-sm-12 btns d-flex justify-content-center mt-3">
                      <button
                        className="btn-del px-2"
                        onClick={() => setShowImageForm(true)}
                      >
                        update Image
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3 pt-3 ps-3 rounded-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.username}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{user.email}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      (+213) {user.phone}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Birthday</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.birthday}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {user.address}
                    </div>
                  </div>
                  <hr />
                  <div className="row ">
                    <div className="col-sm-12 btns d-flex justify-content-end mt-3">
                      <button
                        className="btn-del px-2 me-3"
                        onClick={() => setShowResetPassword(true)}
                      >
                        ResetPassword
                      </button>
                      <button
                        className="btn-del px-2 "
                        onClick={() => setShowUserForm(true)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserForm
        show={showUserForm}
        handleClose={handleHideUserForm}
        onSave={handleSaveUser}
        user={user}
        effect={updateeffect}
      />
      <ImageForm
        show={showImageForm}
        handleClose={handleHideImageForm}
        onSave={handleSaveImage}
        effect={updateeffect}
      />
      <ResetPasswordForm
        show={showResetPassword}
        handleClose={handleHideResetPassword}
        onSave={handleSaveResetPassword}
        effect={updateeffect}
      />
    </div>
  );
};

export default Profile;

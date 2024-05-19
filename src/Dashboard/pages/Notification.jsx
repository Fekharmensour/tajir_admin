import React, { useState, useEffect } from "react";
import TopBar from "../TopBar";
import { Container } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Cookies from 'js-cookie';
import { Toaster, toast } from 'alert';
import axios from "axios";
const config = {
  headers: {
      'Authorization': `Bearer ${Cookies.get('token')}`
  }
};
const Notification = () => {
  const [Notification , SetNotification] = useState([]);
  const status = (status) => {
    if(status === "question"){
      return "info";
    }
    if(status === "error"){
      return "danger";
    }
    return status ;
  }
  const fetchNotification = async () => {
    try {
      const response = await axios.get( 'http://127.0.0.1:8000/api/profile/notification', config);
      if (response.status === 200) {
        SetNotification(response.data.Notification); 
      } else {
        console.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const handlDeleteNotification = async (id) => {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/profile/notification/${id}` , config
    );
    if (response.status === 200) {
      toast.success(response.data.message);
    } else {
      alert(response.data.message);
    }
  };

  useEffect(() => {
    fetchNotification()
  }, []);
  return (
    <div>
      <TopBar />
      <Toaster width={100}  position='top-center'/>
      <Container className="mt-5">
        {Notification.length === 0 ? <h4 className="text-center">No Notification</h4> : 
        Notification.map((e)=>(
            <Alert variant={status(e.status)} onClose={() => handlDeleteNotification(e.id)} dismissible className="rounded-4">
            <Alert.Heading>{e.title}</Alert.Heading>
            <p>
              {e.body}
            </p>
          </Alert>
        ))}
        
      </Container>
    </div>
  );
};

export default Notification;

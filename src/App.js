import {Route , Routes  } from "react-router-dom"
import Dashboard from "./Dashboard";
import User from "./Dashboard/pages/User"
import Static from "./Dashboard/pages/static";
import 'react-bootstrap/dist/react-bootstrap';
import SignIn from "./Dashboard/SignIn";
import Privet_dashbord from "./provide/Privet_rout_dashbord";
import { AuthProvider_Dashbord } from "./context/AuthContext_Dashbord";
import Complaint  from "./Dashboard/pages/Complaint";
import Swal from 'sweetalert2';
import Profile from "./Dashboard/pages/Profile";
import Notification from "./Dashboard/pages/Notification";
import Coupon from "./Dashboard/pages/Coupon";


function App() {

 

  return (
    <div className="App">
      <AuthProvider_Dashbord>
        <Routes>
          {/* this is privete router method */}
          <Route path='/sign' element={<SignIn  />}/>
          <Route element={<Privet_dashbord/>}>
            <Route path=''  element={<Dashboard/>}>
              <Route path='user' element={<User/>}/>
              <Route path='complaint' element={<Complaint/>}/>
              <Route path='profile' element={<Profile/>}/>
              <Route path='notification' element={< Notification />}/>
              <Route path='coupon' element={< Coupon />}/>
              <Route path='' element={<Static/>}/>
            </Route>
          </Route>
        </Routes>
      </AuthProvider_Dashbord>
    
  </div>
  );
}

export default App;

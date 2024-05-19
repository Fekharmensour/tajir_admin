import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MedicationIcon from '@mui/icons-material/Medication';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SettingsIcon from '@mui/icons-material/Settings';
import ThreePIcon from '@mui/icons-material/ThreeP';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from 'react-router-dom' ;
import AuthContext_Dashbord from '../context/AuthContext_Dashbord';
import Swal from 'sweetalert2';
import { FaUserMd } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { BiSolidMessageDetail } from "react-icons/bi";
import { RiCoupon3Fill } from "react-icons/ri";
import { FaShop } from "react-icons/fa6";
import { TbSettingsExclamation } from "react-icons/tb";
import { BiSolidMessageSquareError } from "react-icons/bi";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    background: '#z',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    display:'flex',
    justifyContent:'space-between',
    boxShadow: 'none',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': {
         ...openedMixin(theme) ,
          background: ' rgb(251 146 60)' ,
           boxShadow: 'none',
           display:'flex',
           justifyContent:'space-between',
          } ,
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': {
        ...closedMixin(theme) ,
         background: 'rgb(251 146 60)' ,
         display:'flex',
         justifyContent:'space-between',
          boxShadow: 'none',
         },
    }),
  }),
);

export default function SidBar() {
  const {logout_admin} = React.useContext(AuthContext_Dashbord);
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const [dash , setDash] = React.useState(false);
  const [user , setUser] = React.useState(false);
  const [complaint , setComplaint] = React.useState(false);
  const [coupon , setCoupon] = React.useState(false);
  const [note , setNote] = React.useState(false);
  const [profile , setProfile] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const log_out = ()=>{ 
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Exit The Dashbord Interface?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FB923C",
      cancelButtonColor: "#001C30",
      confirmButtonText: "Exit it " ,
      customClass: {
        container: 'swal-container' ,
      }
    }).then((result) => {
      if (result.isConfirmed) {
        logout_admin();
      }
    });
  }
  const handelallFalse = () => {
    setDash(false);
    setUser(false);
    setComplaint(false);
    setCoupon(false) ;
    setNote(false) ;
    setProfile(false)
  }
  return (
    <Box sx={{ display: 'flex' }} >
      <CssBaseline /> 
      <Drawer variant="permanent" open={open} className='d-flex  justify-content-between ' >
        <div className="">
        <DrawerHeader onClick={()=>setOpen(!open)} className='draw_header d-flex justify-content-between align-items-center mb-5 ms-1'>
          <div className=' d-flex ms-2 align-items-center'>
            {open?null
            :<FormatListBulletedIcon className='title'/>}
          </div>
          <IconButton onClick={()=>setOpen(!open)} style={{color:'white'}}>
             {open?<CloseIcon/>:null}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List className='items '>
            <ListItem key={'Dashbord'} disablePadding sx={{ display: 'block' }} className={dash?"item active" : "item"} title={open? undefined!:'Status'}  
            onClick={()=>{
              handelallFalse()
              setDash(true)
              navigate('/')
              }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                <DashboardIcon className='icon'/>
                </ListItemIcon>
                <ListItemText primary={'Dashbord'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key={'User'} disablePadding sx={{ display: 'block' }} className={ user ?"item active" : "item"}title={open?undefined!:'Users'}  onClick={()=>{
              handelallFalse()
              setUser(true)
              navigate('/user')
              }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                <FaUsers className='icon fs-3'/>
                </ListItemIcon>
                <ListItemText primary={'Users'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            
            <ListItem key='Coupon' disablePadding sx={{ display: 'block' }} className={coupon?"item active" : "item"} title={open?undefined!:'Coupon & Ads'}  
            onClick={()=>{
              handelallFalse()
              setCoupon(true) ;
              navigate('/coupon')
              }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                <RiCoupon3Fill   className='icon fs-4'/>
                </ListItemIcon>
                <ListItemText primary={'Coupon & Ads'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem key='Complaint' disablePadding sx={{ display: 'block' }} className={complaint?"item active" : "item"} title={open?undefined!:'Complaint'}  
            onClick={()=>{
              handelallFalse()
              setComplaint(true)
              navigate('/complaint')
              }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                <SettingsIcon  className='icon fs-4'/>
                </ListItemIcon>
                <ListItemText primary={'Complaint'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            
        </List>
        <Divider />
        <List className='items '>
            <ListItem key={'Profile'} disablePadding sx={{ display: 'block' }} className={profile?"item active" : "item"} title={open?undefined!:'Profile'}  onClick={()=>{
              handelallFalse()
              setProfile(true) ;
              navigate('/profile')
            }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                <AccountBoxIcon className='icon'/>
                </ListItemIcon>
                <ListItemText primary={'Profile'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key={'Notification'} disablePadding sx={{ display: 'block' }} className={note ?"item active" : "item"} title={open?undefined!:'Notification'} onClick={()=>{
              handelallFalse()
              setNote(true) ;
              navigate('/notification')
            }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                <BiSolidMessageSquareError    className='icon fs-4'/>
                </ListItemIcon>
                <ListItemText primary={'Notification'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem> 
        </List>
        </div>
        <div className='mt-5 items'>
          <ListItem className='item mt-5' key={'Logout'} disablePadding sx={{ display: 'block' }} title={open?undefined!:'LogOut'}  onClick={()=>log_out()}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                <MeetingRoomIcon className='icon'/>
                </ListItemIcon>
                <ListItemText primary={'LogOut'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </div>
      </Drawer>
      
    </Box>
  );
}
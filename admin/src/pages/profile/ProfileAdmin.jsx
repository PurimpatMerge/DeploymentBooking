import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import './ProfileAdmin.css'
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import React from "react";
import { Card  } from "antd";
import Avatar from '@mui/material/Avatar';
import Sidebar from "../../components/sidebar/Sidebar";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Navbar from "../../components/navbar/Navbar";
import {  deepPurple } from '@mui/material/colors';
const { Meta } = Card;

const Profile = (props) => {
  const { username, email, phone, lineId } = props;

  return (
    <Card>
      <Meta
        avatar={<Avatar sx={{ bgcolor: deepPurple[500] , width: 60, height: 60}}>Admin</Avatar>}
        title={username}
        description={email}
      />
      <p className="gap">Phone: {phone}</p>
      <p>Line ID: {lineId}</p>
    </Card>
  );
};
const ProfileAdmin = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/users/${user._id}`);

  const useStyles = makeStyles((theme) => ({
    content: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%'
    },
    root: {
      padding: theme.spacing(3),
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      borderRadius: theme.spacing(2),
      boxShadow: theme.shadows[5],
      width: '80%',
      maxWidth: 600,
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      margin: theme.spacing(2),
    },
    text: {
      fontSize: '2rem',
      
    },
    button: {
      margin: theme.spacing(3),

    }, 
    profileText: {
      fontSize: '20px', // adjust this to your desired font size
    },
  }));
  const classes = useStyles();
  return (


    <div className='container'>

      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
      <div>
        <Navbar />
      </div>
      <ReactNotifications />
      <div className={classes.content}>
        <Paper className={classes.root}>
          <div className="center">
          <Typography className={classes.title}>Profile</Typography>
          </div>
          
         
          <Profile
              username={<Typography className={classes.profileText}>{data.username}</Typography>}
              email={<Typography className={classes.profileText}>{data.email}</Typography>}
              phone={<Typography className={classes.profileText}>{data.phone}</Typography>}
              lineId={<Typography className={classes.profileText}>{data.lineId}</Typography>}
            />
          <div className="btn">
            <Link to={`/profile/${user._id}`} style={{ color: "inherit", textDecoration: "none" }}>
              <Button className={classes.button} variant="contained" color="primary">
                Edit
              </Button>
            </Link>
          </div>
        </Paper>

      </div>
      </div>
    </div>

  );
};

export default ProfileAdmin;

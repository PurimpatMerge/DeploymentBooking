import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import React from "react";
import { Card, Avatar } from "antd";
import Sidebar from "../../components/sidebar/Sidebar";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
const { Meta } = Card;

const Profile = (props) => {
  const { username, email, phone, lineId } = props;

  return (
    <Card>
      <Meta
        avatar={<Avatar src="https://example.com/avatar.jpg" />}
        title={username}
        description={email}
      />
      <p>Phone: {phone}</p>
      <p>Line ID: {lineId}</p>
    </Card>
  );
};
const ProfileAdmin = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/users/${user._id}`);
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(3),
      margin: theme.spacing(3),
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      borderRadius: theme.spacing(2),
      boxShadow: theme.shadows[5],
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      margin: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(3),
    },
  }));
  const classes = useStyles();
  
  return (


<div className="bgedit bg-cover object-cover h-screen flex-col">
      <div>
        <Sidebar />
      </div>
      <ReactNotifications />
      <div className="container mx-auto p-10  sm:w-5/12 bg-white bg-opacity-60  rounded-lg ">
        <div className="w-full  mx-auto my-12 ">
          <div className="flex ">
            <Typography className={classes.title}>Profile</Typography>
          </div>

          <Paper className={classes.root}>
            <Profile
              username={data.username}
              email={data.email}
              phone={data.phone}
              lineId={data.lineId}
            />
          </Paper>
        </div>
        <Link to={`/profile/${user._id}`} style={{ color: "inherit", textDecoration: "none" }}>
          <Button className={classes.button} variant="contained" color="primary">
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileAdmin;

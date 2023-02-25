import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { profile } from "../../formSource";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from "@material-ui/core/Button";
import { showAlertFillter } from "../../components/alertMessage.js";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Input } from "antd";
import Navbar from "../../components/navbar/Navbar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Sidebar from "../../components/sidebar/Sidebar";
import "./ProfileAdmin.css";
const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/users/${user._id}`);
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const updatehotel = {
        ...data,
        ...info,
      };

      await axios.put(`/users/${user._id}`, updatehotel);
      const res = "pass";
      showAlertFillter(res);
    } catch (err) {
      console.log(err);
    }
  };

  const useStyles = makeStyles((theme) => ({
    content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
    },
    root: {
      padding: theme.spacing(3),
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      borderRadius: theme.spacing(2),
      boxShadow: theme.shadows[5],
      width: "80%",
      maxWidth: 600,
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      margin: theme.spacing(2),
    },
    text: {
      fontSize: "2rem",
    },
    button: {
      margin: theme.spacing(3),
    },
    profileText: {
      fontSize: "20px", // adjust this to your desired font size
    },
  }));
  const classes = useStyles();
  return (
    <>
      <div className="container">
        <div className="sidebar">
          <Sidebar />
        </div>
        <ReactNotifications />
        <div className="content">
          <div>
            <Navbar />
          </div>
          <div className={classes.content}>
            <Paper className={classes.root}>
              <div className="center">
                <Typography className={classes.title}>Edit</Typography>
              </div>
              <form className="flex flex-col mt-4 ">
                {profile.map((input) => (
                  <div className="">
                    <div>
                      <p>{input.label}</p>
                    </div>
                    <div className="formInput" key={input.id}>
                      <Input
                        className="px-4 py-3 w-full  text-sm"
                        contenteditable="true"
                        id={input.id}
                        onChange={handleChange}
                        type={input.type}
                        placeholder={`${data[input.id]}`}
                      />
                    </div>
                  </div>
                ))}
                <div className="btn">
                  <Button
                    onClick={handleClick}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                  >
                    Send
                  </Button>
                </div>
              </form>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;

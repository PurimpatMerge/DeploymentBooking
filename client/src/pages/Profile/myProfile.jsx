import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../Profile/editProfile.css";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Divider } from "antd";
import Navbar from "../../components/navbar/Navbar";


const myProfile = () => {

  return (
    <div className="bgedit bg-cover object-cover h-screen flex-col">
      hello
    </div>
  );
};

export default myProfile;

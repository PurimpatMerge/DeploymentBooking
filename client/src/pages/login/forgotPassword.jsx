import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { showAlertEmail } from "../../components/alertMessage.js";
import "./login.css";
import "../Profile/editProfile.css";
import { Input } from "antd";
import { Divider } from "antd";
const Login = () => {
  const [password, setPassword] = useState("");

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPassword((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const a = await axios.post("https://api-pool-villa.onrender.com/api/auth/forgetPassword", password);
      if (a.data === "This Email doesn't Exists") {
        return showAlertEmail("Fail");
      }
      const res = "pass";
      showAlertEmail(res);
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (err) {
      showAlertEmail("Fail");
    }
  };

  return (
    <div className="bgedit bg-cover object-cover h-screen py-10 sm:py-20">
      <ReactNotifications />
      <div className="container justify-items-center mx-auto p-4 sm:w-5/12 backdrop-blur-sm bg-white/30 border border-gray-400  rounded-lg">
        <div className="w-full  mx-auto my-12">
          <h1 className="text-4xl flex font-bold text-black justify-center">
            Reset password. We will send to your email.
          </h1>
          <Divider />
          <div className="flex flex-col mx-10">
            <Input
              type="text"
              placeholder="email"
              id="email"
              onChange={handleChange}
              className="px-4 py-3 w-full rounded-md bg-gray-100  text-sm"
            />
            <div className="mt-10 flex flex-col mx-auto">
              <button
                disabled={loading}
                onClick={handleClick}
                className="duration-500 hover:scale-110 mt-4 px-20 py-3  leading-6 text-base rounded-md border border-transparent   bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center font-medium focus:outline-none"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import axios from "axios";
import { useState } from "react";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {
  showAlertRegister,
  showErrorAlertFillter,
} from "../../components/alertMessage.js";
import { TextField } from "@material-ui/core";
import { userInputs } from "../../formSource";
import "../Profile/editProfile.css";
import { Divider } from "antd";
import Navbar from "../../components/navbar/Navbar.jsx";
const Register = () => {
  const [info, setInfo] = useState({});
  const [inputError, setInputError] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    try {
      const phoneRegex = /^\d{9,11}$/;
      if (!phoneRegex.test(info.phone)) {
        showErrorAlertFillter("valid phone");
        return;
      }

      const newUser = {
        ...info,
      };
      
      const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
      if (!passwordRegex.test(info.password)) {
        showErrorAlertFillter("PasswordSet");
        return;
      }
      if (info.password !== confirmPassword) {
        showErrorAlertFillter("noMatch");
        return;
      }

      if (info.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(info.email)) {
        showErrorAlertFillter("email");
        return;
      }
      await axios.post(
        "https://api-pool-villa.onrender.com/api/auth/register",
        newUser
      );
      const res = "pass";
      showAlertRegister(res);
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (err) {
      showErrorAlertFillter(err.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bgedit bg-cover object-cover  h-screen  py-[70px] sm:py-[150px]">
        <ReactNotifications />
        <div className="container mx-auto py-4 px-10  sm:w-5/12 backdrop-blur-sm bg-white/30 border border-gray-400  rounded-lg">
          <div className="w-full  mx-auto my-12 ">
            <h1 className="text-4xl flex font-bold text-black justify-center">
              Register
            </h1>
            <Divider />
            {userInputs.map((input) => (
              <form className="flex flex-col mt-4 ">
                <label>{input.label}</label>
                <TextField
                  error={inputError[input.id]}
                  helperText={
                    inputError[input.id] ? "This field is required" : null
                  }
                  className="px-4 py-3 w-full"
                  variant="outlined"
                  InputProps={{
                    className: "bg-white ",
                  }}
                  size="small"
                  onChange={handleChange}
                  type={input.type}
                  placeholder={input.placeholder}
                  id={input.id}
                  onBlur={(event) => {
                    setInputError({
                      ...inputError,
                      [input.id]: event.target.value === "",
                    });
                  }}
                />
              </form>
            ))}
            <p className="pt-4">Confirm password</p>
            <input
              className="px-4 py-3 w-full"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                onClick={handleClick}
                className="duration-500 hover:scale-110 mt-4 px-20 py-3 w-[200px] leading-6 text-base rounded-md border border-transparent   bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center  justify-center font-medium focus:outline-none"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

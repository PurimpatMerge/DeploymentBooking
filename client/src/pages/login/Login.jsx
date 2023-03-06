import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import "../Profile/editProfile.css";
import { Input } from "antd";
import { Divider } from "antd";
import Navbar from "../../components/navbar/Navbar";
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("https://api-pool-villa.onrender.com/api/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <>
    <Navbar/>
      <div className="bgedit bg-cover object-cover h-screen py-[70px] sm:py-[150px]">
        <div className="container justify-items-center mx-auto p-4 sm:w-5/12 backdrop-blur-sm bg-white/30 border border-gray-400  rounded-lg">
          <div className="w-full  mx-auto my-12">
            <h1 className="text-4xl flex font-bold text-black justify-center">
              Login
            </h1>
            <Divider />
            <div className="flex flex-col mx-10">
            <label>Username</label>
              <Input
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
                className=" px-4 py-3 w-full rounded-md bg-white   focus:ring-0 text-sm"
              />
               <label className="mt-10">Password</label>
              <Input
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
                className=" px-4 py-3 w-full rounded-md bg-white   focus:ring-0 text-sm"
              />
              <div className="mt-10 flex flex-col mx-auto">
                <button
                  disabled={loading}
                  onClick={handleClick}
                  className="duration-500 hover:scale-110 mt-4 px-20 py-3  leading-6 text-base rounded-md border border-transparent   bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center font-medium focus:outline-none"
                >
                  Login
                </button>
                <div className="mt-4 mx-auto">
                  <Link
                    to="/forgotPassword"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <button className="inline-block text-sm px-4 py-2 leading-none  rounded text-blue-600 hover:border-transparent duration-500 hover:scale-110  hover:text-indigo-500  lg:mt-0">
                      Forgot password
                    </button>
                  </Link>
                </div>
              </div>
            </div>
<div className="decoration-red-200 text-center w-full">
          {error && <p>{error.message}</p>}
</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

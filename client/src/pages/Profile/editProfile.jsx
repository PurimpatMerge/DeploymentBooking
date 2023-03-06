import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { profile } from "../../formSource";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { showAlertFillter } from "../../components/alertMessage.js";
import "../Profile/editProfile.css";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Input } from "antd";
import Navbar from "../../components/navbar/Navbar";
import { Divider } from "antd";
import { Link } from "react-router-dom";
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

      await axios.put(
        `https://api-pool-villa.onrender.com/api/users/${user._id}`,
        updatehotel
      );
      const res = "pass";
      showAlertFillter(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bgedit bg-cover object-cover min-h-screen flex-col">
      <Navbar />
      <ReactNotifications />
      <div className="container mt-32  mx-auto p-10  lg:w-5/12  backdrop-blur-sm bg-white/30 border border-gray-400  rounded-lg ">
        <div className="w-full  mx-auto my-12 ">
          <h1 className="text-4xl flex font-bold text-black justify-center">
            Edit Profile
          </h1>
          <Divider />
          <form>
            {profile.map((input) => (
              <div className="grid grid-cols-12">
                <div className="col-span-4 sm:col-span-2 mt-5">
                  <span>{input.label}:</span>
                </div>
                <div
                  className="formInput col-span-8 sm:col-span-10 mt-5"
                  key={input.id}
                >
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
            <div className="flex justify-between items-center py-10">
              <Link
                to="/forgotPassword"
                className="text-purple-500 hover:text-indigo-500"
              >
                Change password
              </Link>
              <button
                className="bg-green-600 text-white font-semibold py-3 px-10 rounded-md tracking-tight duration-300 hover:scale-105"
                onClick={handleClick}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

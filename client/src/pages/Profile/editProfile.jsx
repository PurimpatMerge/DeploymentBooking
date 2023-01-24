
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { profile } from "../../formSource";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { showAlertFillter } from "../../components/alertMessage.js";

import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

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


  return (
   



      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 h-screen py-10 sm:py-20">
        <ReactNotifications />
        <div className="container mx-auto p-4 sm:w-5/12 bg-white bg-opacity-50  rounded-lg">
          <div className="w-full  mx-auto my-12 ">
            <div className="flex ">
              <h1 className="text-2xl font-extrabold text-black mx-auto">Edit Profile</h1>
            </div>
            
              <form className="flex flex-col mt-4 ">
              {profile.map((input) => (
                <div>
                <label>{input.label}</label>
                <div className="formInput" key={input.id}>

                  <input
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    contenteditable="true"
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={`${data[input.id]}`}

                  />
                </div>
                </div>
             
            ))}
             <button className="mt-4  py-3  leading-6 text-base rounded-md border border-transparent  bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center font-medium focus:outline-none" onClick={handleClick}>Send</button>
             </form>
          </div>
        </div>
      </div>

   
  );
};

export default EditProfile;

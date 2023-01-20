import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { userInputs } from "../../formSource";

const Register = () => {
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    const newUser = {
      ...info,
    };

    await axios.post("/auth/register", newUser);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 h-screen py-10 sm:py-20">
      <div className="container mx-auto p-4 sm:w-5/12 bg-white bg-opacity-50  rounded-lg">
        <div className="w-full  mx-auto my-12 ">
          <div className="flex ">
            <h1 className="text-2xl font-extrabold text-black mx-auto">Register</h1>
          </div>
          {userInputs.map((input) => (
            <form className="flex flex-col mt-4 ">
              <label>{input.label}</label>
              <input
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                onChange={handleChange}
                type={input.type}
                placeholder={input.placeholder}
                id={input.id}
              />
              
            </form>
          ))}
          <button
            type="submit"
            onClick={handleClick}
            className="mt-4  py-3  leading-6 text-base rounded-md border border-transparent  bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center font-medium focus:outline-none"
          >
            Register
          </button>
          <div className="flex flex-col items-center mt-5">
            <p className="mt-1 text-xs font-light text-gray-500 ">
              Register already?<a class="ml-1 font-medium text-blue-400 hover:text-violet-400 hover:cursor-pointer duration-200 ">Sign in now</a>
            </p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Register;

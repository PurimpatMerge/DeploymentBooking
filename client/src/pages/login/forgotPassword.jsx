import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [password, setPassword] = useState("");

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setPassword((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      console.log(1);
      await axios.post("/auth/forgetPassword", password);
    } catch (err) {
      return (err);
    }
  };


  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 h-screen py-10 sm:py-20">
      <div className="container justify-items-center mx-auto p-4 sm:w-5/12 bg-white bg-opacity-50  rounded-lg">
        <div className="w-full  mx-auto my-12">
          <div className="flex ">
            <h1 className="text-2xl font-extrabold text-black mx-auto mb-10">Forget Password</h1>
          </div >
          <div className="flex flex-col mx-10">
            <input
              type="text"
              placeholder="email"
              id="email"
              onChange={handleChange}
              className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
            />
            <div className="mt-10 flex flex-col mx-auto">
              <button
                disabled={loading} onClick={handleClick}
                className="duration-500 hover:scale-110 mt-4 px-20 py-3  leading-6 text-base rounded-md border border-transparent   bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center font-medium focus:outline-none">
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

import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import {userInputs} from "../../formSource";

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
    <div className="login">
         {userInputs.map((input) => (
      <div className="lContainer">
      <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                  </div>
                   ))}
        <button onClick={handleClick} className="lButton">
        Register
        </button>
  
      </div>
  );
};

export default Register;

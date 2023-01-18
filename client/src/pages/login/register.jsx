import axios from "axios";
import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { userInputs } from "../../formSource";

import {
  showAlertFillter,
  showAlertUserDuplicate,
} from "../../components/alertMessage.js";

import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const Register = () => {
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    const emptyString =
      info === undefined || Object.values(info).some((val) => val === "");
    if (emptyString) {
      const fillter = "Fill all the box";
      return showAlertFillter(fillter);
    }

    try {
      const newUser = {
        ...info,
      };

      await axios.post("/auth/register", newUser);
      const res = "pass";
      showAlertFillter(res);
    } catch (err) {
      showAlertUserDuplicate(err.message);
    }
  };

  return (
    <div className="login">
      <ReactNotifications />
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

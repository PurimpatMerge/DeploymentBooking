import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import {
  showAlertFillter,
  showAlertUserDuplicate,
} from "../../components/alertMessage.js";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const emptyString =
        info === undefined || Object.values(info).some((val) => val === "");
      if (emptyString) {
        const fillter = "Fill all the box";
        return showAlertFillter(fillter);
      }
      const newUser = {
        ...info,
      };
      await axios.post("/auth/registeradmin", newUser);
      const res = "pass";
      showAlertFillter(res);
    } catch (err) {
      showAlertUserDuplicate(err.message);
    }
  };

  return (
    <div className="new">
      <ReactNotifications />
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left"></div>
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

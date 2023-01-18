
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { profile } from "../../formSource";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import {showAlertFillter} from "../../components/alertMessage.js";

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
      const res ="pass";
      showAlertFillter(res);
    } catch (err) {
      console.log(err);
    }
  };

  
  return (
    <div className="new">
     <ReactNotifications/>
      <div className="newContainer">
      
        <div className="top">
          <h1>edit profile {data.id}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <h2>Merge your profile</h2>
              </div>
              <div className="formInput"></div>

              {profile.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    contenteditable="true"
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={`${data[input.id]}`}
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

export default EditProfile;

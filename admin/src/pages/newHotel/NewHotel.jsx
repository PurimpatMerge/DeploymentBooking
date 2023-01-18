import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import axios from "axios";

import {showAlertFillter} from "../../components/alertMessage.js";

import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});


  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  console.log(files);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dwwfqdl79/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newhotel = {
        ...info,
        photos: list,
      };

      await axios.post("/hotels", newhotel);
      const res = "pass";
      showAlertFillter(res);
    } catch (err) {
      console.log(err);
      showAlertFillter("Fill in the box");
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <ReactNotifications/>
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            <p>upload picture : {files.length} / 10</p>
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
    
                  </div>
              <div className="formInput">
                  <h2>Poolvilla requriments</h2>
                  </div>
                  <div className="formInput">
    
                  </div>
              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input contentEditable="true"
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              <div className="formInput" >
                
              </div>
              <div className="formInput">
                <h2> Option</h2>
              </div>
              <div className="formInput" >
                <h2> </h2>
              </div>
              <div className="formInput">
                <label>Swimming Pool</label>
                <select  id="swimmingPool" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
                <label>Slider</label>
                <select id="slider" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="formInput">
                <label>Rubber Ring</label>
                <select id="rubberRing" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
                <label>Karaoke</label>
                <select id="karaoke" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="formInput">
                <label>Allowed Animal</label>
                <select id="animal" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
                <div className="formInput">
                <label>Snooker</label>
                <select id="snooker" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
                </div>
              </div>
              <div className="formInput">
                <label>Disco Light</label>
                <select id="discoLight" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
                <label>Kitchen Equipment</label>
                <select id="kitchenEquipment" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="formInput">
                <label>Free wifi</label>
                <select id="wifi" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="formInput" >
                <h2> </h2>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;

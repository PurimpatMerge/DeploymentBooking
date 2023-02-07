import "./EditHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { hotelInputs } from "../../formSource";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { showAlertFillter, showAlertDelete } from "../../components/alertMessage.js";

import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import MyCalendar from './calendar.jsx';

const NewHotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
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

      const updatehotel = {
        ...data,
        ...info,
        photos: data?.photos.concat(list) || list,
      };

      await axios.put(`/hotels/${id}`, updatehotel);
    } catch (err) {
      console.log(err);
    }
    const res = "pass";
    showAlertFillter(res);
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  };

  // const handleDelete = async (id) => {
  //   try {
  //     // if (data.photos.length > 0) {
  //     //   for (const image of data.photos) {
  //     //     // Extract the public ID from the image URL
  //     //     const publicId = image.split('/').pop().split('.')[0];
 
  //     //     // Delete the image from Cloudinary using the DELETE method
  //     //     await axios.delete(`https://api.cloudinary.com/v1_1/dwwfqdl79/image/upload/${publicId}`);
          
  //     //   }
  //     // }
  //     await axios.delete(`/hotels/photos/${id}`);
  //     showAlertDelete();
  //   } catch (err) {}
  // };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this photo?")) {
      try {
        await axios.delete(`/hotels/photos/${id}`);
        showAlertDelete();
      } catch (err) {}
    }
  };
  
  return (
    <div className="new">
      <ReactNotifications />
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Product {data.name}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <div>
              {data && data.photos && data.photos?.length > 0 && (
                <img src={data.photos[0]} alt="" />
              )}
            </div>
            <p>upload picture : {data.photos?.length + files.length} / 10</p>
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
                <div className="deleteButton" onClick={() => handleDelete(id)}>
                  Delete photos
                </div>
              </div>
              <div className="formInput"></div>
              <div className="formInput">
                <h2>Poolvilla requriments</h2>
              </div>
              <div className="formInput"></div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    contentEditable="true"
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={`${data[input.id]}`}
                  />
                </div>
              ))}
              <div className="formInput"></div>
              <div className="formInput">
                <h2> Option</h2>
              </div>
              <div className="formInput">
                <h2> </h2>
              </div>
              <div className="formInput">
                <label>Swimming Pool</label>
                <select id="swimmingPool" onChange={handleChange}>
                  <option value={false} selected={data.swimmingPool === false}>
                    No
                  </option>
                  <option value={true} selected={data.swimmingPool === true}>
                    Yes
                  </option>
                </select>
                <label>slider</label>
                <select id="slider" onChange={handleChange}>
                  <option value={false} selected={data.slider === false}>
                    No
                  </option>
                  <option value={true} selected={data.slider === true}>
                    Yes
                  </option>
                </select>
              </div>
              <div className="formInput">
                <label>Rubber Ring</label>
                <select id="rubberRing" onChange={handleChange}>
                  <option value={false} selected={data.rubberRing === false}>
                    No
                  </option>
                  <option value={true} selected={data.rubberRing === true}>
                    Yes
                  </option>
                </select>
                <label>Karaoke</label>
                <select id="karaoke" onChange={handleChange}>
                  <option value={false} selected={data.karaoke === false}>
                    No
                  </option>
                  <option value={true} selected={data.karaoke === true}>
                    Yes
                  </option>
                </select>
              </div>
              <div className="formInput">
                <label>Allowed Animal</label>
                <select id="animal" onChange={handleChange}>
                  <option value={false} selected={data.animal === false}>
                    No
                  </option>
                  <option value={true} selected={data.animal === true}>
                    Yes
                  </option>
                </select>
                <div className="formInput">
                  <label>Snooker</label>
                  <select id="snooker" onChange={handleChange}>
                    <option value={false} selected={data.snooker === false}>
                      No
                    </option>
                    <option value={true} selected={data.snooker === true}>
                      Yes
                    </option>
                  </select>
                </div>
              </div>
              <div className="formInput">
                <label>Disco Light</label>
                <select id="discoLight" onChange={handleChange}>
                  <option value={false} selected={data.discoLight === false}>
                    No
                  </option>
                  <option value={true} selected={data.discoLight === true}>
                    Yes
                  </option>
                </select>
                <label>Kitchen Equipment</label>
                <select id="kitchenEquipment" onChange={handleChange}>
                  <option value={false} selected={data.kitchenEquipment === false}>
                    No
                  </option>
                  <option value={true} selected={data.kitchenEquipment === true}>
                    Yes
                  </option>
                </select>
              </div>
              <div className="formInput">
                <label>Free wifi</label>
                <select id="wifi" onChange={handleChange} >
                  <option value={false} selected={data.wifi === false}>
                    No
                  </option>
                  <option value={true} selected={data.wifi === true}>
                    Yes
                  </option>
                </select>
              </div>
              <div className="formInput">
                <h2> </h2>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
            <MyCalendar  startPrice={data.cheapestPrice} friPrice={data.friPrice} satPrice={data.satPrice}  sunPrice={data.sunPrice} poolvilla ={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;

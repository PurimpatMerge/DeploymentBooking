import React from "react"
import axios from "axios";
import { useState, useEffect } from "react";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { showAlertFillter, showErrorAlertFillter } from "../../../components/alertMessage.js";
import { TextField } from "@material-ui/core";
import { useContext } from "react";
import { profile } from "../../../formSource";
import { AuthContext } from "../../../context/AuthContext";
import useFetch from "../../../hooks/useFetch";
import { Image } from 'antd';




const Secondstep = (props) => {
  const { bookingTotalPrice, bookingDates, id, poolvillaName } = props;
  const [info, setInfo] = useState({});
  const [inputError, setInputError] = useState({});
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/users/${user._id}`);


  const formattedDates = bookingDates.map((date) => {
    const [, dateString, price] = date.match(/{Day: ([^}]+) Price: (\d+)}/);
    const parsedDate = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = parsedDate.toLocaleDateString('en-US', options);
    return `${formattedDate} Price: ${price}`;
  });

  const BookingDatesList = () => {
    return (
      <>
        {formattedDates.map((date) => (
          <p>{date}</p>
        ))}
      </>
    );
  };

  // UploadImage
  const [files, setFiles] = useState("");


  // End UploadImage

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    try {
      const bookingDatesDone = bookingDates.map((date) => {
        const match = date.match(/{Day: (.*) Price: (.*)}/);
        if (!match) {
          throw new Error(`Invalid booking date format: ${date}`);
        }
        return {
          day: match[1],
          price: parseInt(match[2]),
        };
      });

      console.log(1)
      const phoneRegex = /^\d{9,11}$/;
      if (!phoneRegex.test(info.phone)) {
        showErrorAlertFillter("valid phone");
        return;
      }

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


      const bookingDetail = {
        poolvillaName: poolvillaName,
        bookingTotalPrice: bookingTotalPrice,
        bookingDates: bookingDatesDone,
        statusBooking: "pending",
        ...info,
        slip: list,
        poolvillaId: id
      };

      await axios.post("/booking/confirm", bookingDetail);
      const res = "pass";
      showAlertFillter(res);
      //   setTimeout(() => {
      //     window.location.href = '/';
      //   }, 3000);
    } catch (err) {
      showErrorAlertFillter(err.response.data.message);
    }
  };



  return (
    <div className="bg-white shadow-lg  p-4 rounded-md">
      <ReactNotifications />
      <div className="w-full grid justify-items-center ">
        <div>
          {poolvillaName}
          <div>
            <BookingDatesList />
            Total: {bookingTotalPrice}
          </div>
          {profile.map((input) => (
            <form className="flex flex-col mt-4 ">
              <label>{input.label}</label>
              <TextField
                error={inputError[input.id]}
                helperText={
                  inputError[input.id] ? "This field is required" : null
                }
                className="px-4 py-3 w-full"
                variant="outlined"
                InputProps={{
                  className: "bg-white "
                }}
                size="small"
                onChange={handleChange}
                type={input.type}
                placeholder={`${data[input.id]} ` || input.placeholder}
                id={input.id}
                onBlur={(event) => {
                  setInputError({
                    ...inputError,
                    [input.id]: event.target.value === "",
                  });
                }}
              />

            </form>
          ))}



          <div className="flex my-5 justify-center">

            <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-blue-600">
              <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">Select a file</span>
              <input hidden accept="image/*" type="file" onChange={(e) => setFiles(e.target.files)} />
            </label>


          </div>
          <div className="flex my-1  justify-center">

            <Image width={250} className="sm:w-36  h-20 sm:h-36 rounded-lg" src={
              files
                ? URL.createObjectURL(files[0])
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
              alt="" />


          </div>


          <button
            type="submit"
            onClick={handleClick}
            className="mt-4  py-3  leading-6 text-base rounded-md border border-transparent  bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center font-medium focus:outline-none"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  )
}
export default Secondstep
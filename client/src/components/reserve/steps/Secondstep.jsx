import React from "react"
import axios from "axios";
import { useState } from "react";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { showAlertFillter,showErrorAlertFillter} from "../../../components/alertMessage.js";
import { TextField } from "@material-ui/core";
import { useContext } from "react";
import { profile } from "../../../formSource";
import { AuthContext } from "../../../context/AuthContext";
import useFetch from "../../../hooks/useFetch";
const Secondstep = (props) => {
    const { bookingTotalPrice,bookingDates } =props;
    const [info, setInfo] = useState({});
    const [inputError, setInputError] = useState({});
    const { user } = useContext(AuthContext);
    const { data, loading, error } = useFetch(`/users/${user._id}`);
    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };


      const handleClick = async (e) => {
        try{
            console.log(1)
          const phoneRegex = /^\d{9,11}$/;
          if (!phoneRegex.test(info.phone)) {
            showErrorAlertFillter("valid phone");
            return;
          }
    
          const newUser = {
            bookingTotalPrice:bookingTotalPrice,
            bookingDates:bookingDates,
            ...data,
            ...info,
          };
      console.log(newUser)
        //   await axios.post("/auth/register", newUser);
          const res = "pass";
          showAlertFillter(res);
        //   setTimeout(() => {
        //     window.location.href = '/';
        //   }, 3000);
        }catch(err){
          showErrorAlertFillter(err.response.data.message);
        }
      };
    return (
        <div className="bg-white shadow-lg  p-4 rounded-md">
                <ReactNotifications />
            <div className="w-[300px] sm:w-[400px] md:w-[600px] lg:w-[800px]">
              Total: {bookingTotalPrice}<div>
               Date: {bookingDates}
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
                placeholder={`${data[input.id]} `|| input.placeholder}
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
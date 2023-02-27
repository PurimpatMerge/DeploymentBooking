import axios from "axios";
import { useState } from "react";
import {
  showAlertFillter,
  showErrorAlertFillter,
  showAlertImage,
} from "../../../components/alertMessage.js";
import { TextField } from "@material-ui/core";
import { useContext } from "react";
import { profile } from "../../../formSource";
import { AuthContext } from "../../../context/AuthContext";
import useFetch from "../../../hooks/useFetch";
import { Image } from "antd";
import { Divider } from "antd";
import qr from '../../../photo/qrcode.jpg'
const Secondstep = (props) => {
  const { bookingTotalPrice, bookingDates, id, poolvillaName } = props;
  const [info, setInfo] = useState({});
  const [inputError, setInputError] = useState({});
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/users/${user?._id}`);

  const formattedDates = bookingDates.map((date) => {
    const [, dateString, price] = date.match(/{Day: ([^}]+) Price: (\d+)}/);
    const parsedDate = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = parsedDate.toLocaleDateString("en-US", options);
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

      const phoneRegex = /^\d{9,11}$/;
      if (!phoneRegex.test(info.phone || data.phone)) {
        showErrorAlertFillter("valid phone");
        return;
      }

      if (!user) {
        if (!info.username || !info.email || !info.lineId) {
          showErrorAlertFillter("fill");
          return;
        }
      }


      if (!files) {
        showAlertImage("Insert slip");
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
      let bookingDetail;
      if (user) {
        bookingDetail = {
          poolvillaName: poolvillaName,
          bookingTotalPrice: bookingTotalPrice,
          bookingDates: bookingDatesDone,
          statusBooking: "Pending",
          email: data.email,
          lineId: data.lineId,
          phone: data.phone,
          username: data.username,
          slip: list,
          poolvillaId: id,
        };
      }
      else {
        bookingDetail = {
          poolvillaName: poolvillaName,
          bookingTotalPrice: bookingTotalPrice,
          bookingDates: bookingDatesDone,
          statusBooking: "Pending",
          ...info,
          slip: list,
          poolvillaId: id,
        };
      }

      console.log(bookingDetail);

      await axios.post("https://api-pool-villa.onrender.com/api/booking/confirm", bookingDetail);
      const res = "pass";
      showAlertFillter(res);
      setTimeout(() => {
        window.location.href = "/";
      }, 5000);
    } catch (err) {
      showErrorAlertFillter(err.response.data.message);
    }
  };

  return (
    <div>
      <div className="bg-white shadow-lg  p-4 rounded-md">
        <div className="w-full grid gap-5 grid-cols-1 lg:grid-cols-3 justify-items-center ">
          {/* cols1 */}
          <div className="bg-white w-full p-5 rounded-lg">
            <Divider />
            <p className="text-xl">ข้อมูลส่วนตัว</p>
            {user
              ? profile.map((input) => (
                <form
                  key={input.id}
                  className="grid text-left mt-5 grid-cols-12"
                >
                  <p className="col-span-4 text-xs sm:text-base  ">{input.label}:</p>
                  {/* <input
                    className="px-2 w-full col-span-8  sm:col-span-10 bg-white"
                    type="text"
                    value={data[input.id]}
                    readOnly
                  /> */}
                  <p
                    className="px-2 w-full text-xs sm:text-base col-span-8   bg-white"
                    >
                    {data[input.id]}
                  </p>
                </form>
              ))
              : profile.map((input) => (
                <form
                  key={input.id}
                  className="grid text-left mt-5 grid-cols-12"
                >
                  <p className="col-span-3 sm:col-span-2">{input.label}:</p>
                  <TextField
                    error={inputError[input.id]}
                    helperText={
                      inputError[input.id] ? "This field is required" : null
                    }
                    className="px-4 py-3 w-full col-span-9 sm:col-span-10"
                    variant="outlined"
                    InputProps={{
                      className: "bg-white",
                    }}
                    size="small"
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
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

            <Divider className="mt-[74px]" />
            <p className="text-xl">ข้อมูลการจอง</p>
            <div className="text-left">
              <span className="sm:text-base">location:</span>{" "}
              <span className="text-base">{poolvillaName}</span>
              <p className="sm:text-base">
                <BookingDatesList />
              </p>
              <p className="sm:text-base"> Total: {bookingTotalPrice}</p>
            </div>
          </div>
          {/* cols2 */}
          <div className="bg-white w-full p-5 rounded-lg">
            <Divider />
            <p className="text-xl">QR Code</p>
            <div className="flex justify-center">
              <img src={qr} alt="qr" className="w-9/12" />
            </div>
            <Divider />
            <p className="text-xl">โอนผ่านธนาคาร</p>
            <div className="text-left">
              <p>ธนาคาร กสิกร</p>
              <p>เลขที่บัญชี 0268372741</p>
              <p>นาย ปุริมพัฒน์ วรไกรจารุภาคย์</p>
            </div>

          </div>

          {/* cols3 */}
          <div className="w-full p-5 pb-[100px] lg:pb-[100px] rounded-lg">

            <Divider />
            <p className="text-xl">แนบสลิป</p>
            <div className="flex my-5 justify-center">
              <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-blue-600">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">
                  Select a file
                </span>
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => setFiles(e.target.files)}
                />
              </label>
            </div>
            <div className="flex my-1  justify-center">
              <Image
                width={250}
                className="sm:w-36  h-20 sm:h-36 rounded-lg"
                src={
                  files
                    ? URL.createObjectURL(files[0])
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
            <div className="absolute bottom-[150px] right-[60px]">
              <button
                type="submit"
                onClick={handleClick}
                className="mt-4  py-3  leading-6 hover:bg-transparent hover:border-green-700 hover:text-green-700 duration-200 hover:scale-105 text-base rounded-md border border-transparent p-5 bg-purple-800 text-white  cursor-pointer inline-flex items-center w-full justify-center font-medium "
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Secondstep;

import React, { useState } from "react";
import "../../../input.css";
import MyCalendar from "../calendarbooking.jsx";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";


const Firststep = (props) => {
  const { startPrice, friPrice, satPrice, sunPrice, poolvilla } = props;
  // const [info, setInfo] = useState({});
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  let userStartDate = "";
  let userEndDate = "";

  const expireTime = new Date(Date.now() + 2 * 60 * 1000);

  dates.map((el) => {
    userStartDate = moment(el.startDate).format("MM/DD/YYYY");
    userEndDate = moment(el.endDate).format("MM/DD/YYYY");
    document.cookie = `userStartDate=${userStartDate}; expires=${expireTime};`;
    document.cookie = `userEndDate=${userEndDate}; expires=${expireTime};`;
  })

  const [openDate, setOpenDate] = useState(false);
  return (
    <div className="bg-white shadow-lg  p-4 rounded-md grid grid-cols-1 lg:grid-cols-2">
      <div className="h-[450px]">
        <p className="text-red-500">*เลือกวันที่</p>
        <div className="relative h-10 w-[260px] mt-2    lg:my-auto mx-auto">
          <div
            className="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500"
          >
            <FontAwesomeIcon icon={faCalendarDays} className="my-auto mx-2" />
          </div>
          <input
            type="text"
            onClick={() => setOpenDate(!openDate)}
            className="peer h-full w-full rounded-[7px]  border border-blue-500  bg-opacity-80 bg-white px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
          /><label
            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
          >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
            dates[0].endDate,
            "MM/dd/yyyy"
          )}`}
          </label>

          {openDate && (
            <DateRange
              className="absolute  left-1/2 -translate-x-1/2 top-[40px] shadow-lg border border-gray-200 rounded-lg"
              editableDateInputs={true}
              onChange={(item) => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              minDate={new Date()}
            />
          )}
        </div>
      </div>
      {/* col2 */}
      <div >
        <MyCalendar
          startPrice={startPrice}
          friPrice={friPrice}
          satPrice={satPrice}
          sunPrice={sunPrice}
          poolvilla={poolvilla}
          userStartDate={userStartDate}
          userEndDate={userEndDate}
          datesBooking={dates}
        />
      </div>
    </div>
  );
};

export default Firststep;

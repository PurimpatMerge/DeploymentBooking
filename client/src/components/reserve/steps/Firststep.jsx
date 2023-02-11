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

dates.map((el)=> {
     userStartDate = moment(el.startDate).format("MM/DD/YYYY");
     userEndDate = moment(el.endDate).format("MM/DD/YYYY");
     document.cookie = `userStartDate=${userStartDate}; expires=${expireTime};`;
     document.cookie = `userEndDate=${userEndDate}; expires=${expireTime};`;
})

// if(userStartDate && userEndDate){
// // console.log(userStartDate,userEndDate)
// }
  const [openDate, setOpenDate] = useState(false);
  return (
    <div className="bg-white shadow-lg  p-4 rounded-md flex">
      <div className="w-[300px] sm:w-[400px] md:w-[600px] lg:w-[800px]">
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
      <div className="w-[300px] sm:w-[400px] md:w-[600px] lg:w-[800px]">
        
        <div className="flex my-1 ml-1 sm:my-0">
          <FontAwesomeIcon icon={faCalendarDays} className="my-auto mx-2" />
          <span
            onClick={() => setOpenDate(!openDate)}
            className=" my-auto text-xs sm:text-base overflow-hidden border-b bg-slate-100 border-gray-400 h-8 2xl:w-[400px]   lg:w-[200px] text-gray-700 mr-3  leading-tight focus:outline-none"
          >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
            dates[0].endDate,
            "MM/dd/yyyy"
          )}`}</span>
          {openDate && (
            <DateRange
              className="absolute top-[100px]"
              editableDateInputs={true}
              onChange={(item) => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              minDate={new Date()}
              
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default Firststep;

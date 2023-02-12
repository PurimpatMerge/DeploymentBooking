import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [person, setperson] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, person } });
    navigate("/hotels", { state: { destination, dates, person } });
  };

  return (
    <div className=" container mx-auto relative sm:flex  ">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {type !== "list" && (
          <>
            <div className="flex lg:h-[70px] w-fit   sm:w-full sm:absolute  shadow-md bottom-[-30px] justify-between rounded-md bg-slate-100  p-1">
              <div className="flex my-1 sm:my-0">
                <FontAwesomeIcon icon={faBed} className="my-auto mx-2" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="appearance-none text-xs sm:text-base bg-opacity-80 bg-slate-100   border-b border-gray-400 w-[80px] sm:w-[140px] 2xl:w-[400px] lg:w-[200px] text-gray-700 mr-3 h-8 my-auto  leading-tight focus:outline-none"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="flex ml-2 my-1 sm:my-0">
                <FontAwesomeIcon icon={faPerson} className="my-auto mx-2" />
                <input
                  type="text"
                  placeholder="How many person"
                  className="appearance-none  text-xs sm:text-base border-b border-gray-400  bg-slate-100 w-[80px] sm:w-[140px] 2xl:w-[400px]   lg:w-[200px] text-gray-700 mr-3 h-8 my-auto leading-tight focus:outline-none"
                  onChange={(e) => setperson(e.target.value)}
                />
              </div>
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
                    className="date"
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    minDate={new Date()}
                  />
                )}
              </div >

             <div className="flex my-2 justify-center">
             <button type="button" onClick={handleSearch} className="inline-block px-6 py-2.5 bg-white text-gray-700 font-medium text-xs leading-tight uppercase rounded-md shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">Search</button>
             </div>
                
             
              
            </div>

          </>
        )}
      </div>

    </div>
  );
};

export default Header;

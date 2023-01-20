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
    <div className="container mx-auto relative flex justify-center ">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        {type !== "list" && (
          <>
            <div className="flex max-h-14 absolute sm:ml-20 shadow-md bottom-[-7px] justify-between bg-opacity-80 bg-slate-100 rounded-full p-1">
              <div className="flex">
                <FontAwesomeIcon icon={faBed} className="my-auto mx-2" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="appearance-none text-xs sm:text-base bg-opacity-80  border-b border-gray-400  w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="flex">
                <FontAwesomeIcon icon={faPerson} className="my-auto mx-2" />
                <input
                  type="text"
                  placeholder="How many person"
                  className="appearance-none  text-xs sm:text-base border-b border-gray-400   w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  onChange={(e) => setperson(e.target.value)}
                />
              </div>
              <div className="flex">
                <FontAwesomeIcon icon={faCalendarDays} className="my-auto mx-2" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="bg-white my-auto text-xs sm:text-base overflow-hidden border-b border-gray-400   w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
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
              </div>

              
              <button type="button" onClick={handleSearch} class="inline-block px-6 py-2.5 bg-white text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out">Search</button>
            </div>

          </>
        )}
      </div>

    </div>
  );
};

export default Header;

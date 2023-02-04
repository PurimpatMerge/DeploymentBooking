import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
 
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
      
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">4</div>
              <div className="rDesc">3</div>
              <div className="rMax">
                Max people: <b>2</b>
              </div>
              <div className="rPrice">1</div>
            </div>
            <div className="rSelectRooms">
            
                </div>
 
          </div>
        <button className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;

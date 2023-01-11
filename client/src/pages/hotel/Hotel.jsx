import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
// import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
// import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const infoBed = data.bed?.split(",");
  const infoSwimmingPoole = data.swimmingPoolDes?.split(",");
  const infoElse = data.elseDes?.split(",");
  const toKM = data.distanceSea * 0.0001;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? data.photos.length : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === data.photos.length ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleClick}>
              Reserve or Book Now!
            </button>
            <h1 className="hotelTitle">{data.name}</h1>
            <span className="hotelDistance">
              <FontAwesomeIcon icon={faLocationDot} />
              {data.city}
            </span>
            <div className="hotelAddress">
              <a href={data.location}>Google map : {data.location}</a>
            </div>
            <span className="hotelDistance">{toKM}กม. จากทะเล</span>
            <span className="hotelPriceHighlight">
              ราคาเริ่มต้น {data.cheapestPrice}฿ พักได้{data.persons} สูงสุด{" "}
              {data.maxpersons}
            </span>
            <span className="hotelPriceHighlight">
              เงินประกันความเสียหาย{data.insurance}
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">Options</h1>
                <div>
                  <label>
                    {data.swimmingPool === true ? "Swimming Pool" : ""}
                  </label>
                </div>
                <div>{data.slider === true ? "Slider" : ""}</div>
                <div>{data.rubberRing === true ? "Rubber Ring" : ""}</div>
                <div>{data.karaoke === true ? "Karaoke" : ""}</div>
                <div>{data.animal === true ? "Allowed Animal" : ""}</div>
                <div>{data.snooker === true ? "Snooker" : ""}</div>
                <div>{data.discoLight === true ? "Disco Light" : ""}</div>
                <div>
                  {data.kitchenEquipment === true ? "Kitchen Equipment" : ""}
                </div>
                <div>{data.wifi === true ? "Free wifi" : ""}</div>
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">ขนาดสระว่ายน้ำ</h1>
                  <span>
                    {infoSwimmingPoole?.map((item) => (
                      <p>{item}</p>
                    ))}
                  </span>
                </div>
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">ที่จอดรถ</h1>
                  <span>{data.parkinglot}</span>
                </div>
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">เพิ่มเติม</h1>
                  <span>
                  {infoElse?.map((item) => (
                    <p>{item}</p>
                  ))}
                </span>
                </div>
              </div>
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">เวลาเข้าพัก</h1>
                <span>
                  Check-in : {data.checkIn} - Check-out : {data.checkOut}
                </span>
                <h1 className="hotelTitle">เตียง</h1>
                <span>
                  {infoBed?.map((item) => (
                    <p>{item}</p>
                  ))}
                </span>
                <h1 className="hotelTitle">เตียงเสริม</h1>
                <span>{data.addonBed}฿</span>
                <h1 className="hotelTitle">สัตว์เลียง</h1>
                <span>- {data.animalDes}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;

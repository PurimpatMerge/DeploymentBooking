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
  const infoAnimal = data.animalDes?.split(",");
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
    <div className="min-h-screen bg-gradient-to-bl shadow-lg from-indigo-300 to-purple-400">
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
              <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
              <div className="sliderWrapper">
                <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
            </div>
          )}
          <div className="hotelWrapper my-5 bg-white bg-opacity-60 rounded-lg">
            <div className="mx-5 my-5">
              <a onClick={handleClick} href="#_" class="bookNow mr-5 relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
                <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                <span class="relative text-white">Reserve or Book Now!</span>
              </a>
              
              <h1 className="text-violet-800 text-2xl font-bold">{data.name}</h1>
              <span className="hotelDistance">
                <FontAwesomeIcon icon={faLocationDot}  className="text-red-600 mr-2"/>
                  <label className="text-red-600">{data.city}</label> 
              </span>
              <div className="duration-300 text-sm text-gray-600 hover:text-blue-600">
                <a href={data.location}>Google map : {data.location}</a>
              </div>
              <span className="text-sm">ห่าง {toKM} กม. จากทะเล</span>
              <p className="text-base text-blue-600">
                ราคาเริ่มต้น {data.cheapestPrice}฿ พักได้ {data.persons} คน สูงสุด{" "}{data.maxpersons} คน
              </p>
              <span className="text-base text-fuchsia-700">
                เงินประกันความเสียหาย {data.insurance}฿
              </span>
              <div className="flex flex-wrap border-b pb-5 border-gray-700">
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
                <div className="hotelDetailsTexts ">
                  <h1 className="text-violet-800 text-3xl font-semibold">Options</h1>
                  <ul className="list-disc ml-6">
                    <li>{data.swimmingPool === true ? "Swimming Pool" : ""}</li>
                    <li>{data.slider === true ? "Slider" : ""}</li>
                    <li>{data.rubberRing === true ? "Rubber Ring" : ""}</li>
                    <li>{data.karaoke === true ? "Karaoke" : ""}</li>
                    <li>{data.animal === true ? "Allowed Animal" : ""}</li>
                    <li>{data.snooker === true ? "Snooker" : ""}</li>
                    <li>{data.discoLight === true ? "Disco Light" : ""}</li>
                    <li>{data.kitchenEquipment === true ? "Kitchen Equipment" : ""}</li>
                    <li>{data.wifi === true ? "Free wifi" : ""}</li>
                  </ul>
                  <div className="hotelDetailsTexts">
                    <h1 className="text-violet-800 text-3xl ">ขนาดสระว่ายน้ำ</h1>
                    <span >
                      {infoSwimmingPoole?.map((item) => (
                        <p>{item}</p>
                      ))}
                    </span>
                  </div>
                  <div className="hotelDetailsTexts">
                    <h1 className="text-violet-800 text-3xl ">ที่จอดรถ</h1>
                    <span>จอดได้ {data.parkinglot} คัน</span>
                  </div>
                  <div className="hotelDetailsTexts">
                    <h1 className="text-violet-800 text-3xl ">เพิ่มเติม</h1>
                    <span>
                      {infoElse?.map((item) => (
                        <p>{item}</p>
                      ))}
                    </span>
                  </div>
                </div>
                <div className="hotelDetailsTexts">
                  <h1 className="text-violet-800 text-3xl">เวลาเข้าพัก</h1>
                  <span>
                    Check-in : {data.checkIn} - Check-out : {data.checkOut}
                  </span>
                  <h1 className="text-violet-800 text-3xl">เตียง</h1>
                  <ul className="list-disc ml-6">
                    {infoBed?.map((item) => (
                      <li>{item}</li>
                    ))}
                  </ul>
                  <h1 className="text-violet-800 text-3xl">เตียงเสริม</h1>
                  <span>{data.addonBed}฿</span>
                  <h1 className="text-violet-800 text-3xl">สัตว์เลียง</h1>
                  <span>
                    {infoAnimal?.map((item) => (
                      <p>{item}</p>
                    ))}
                  </span>
                </div>
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

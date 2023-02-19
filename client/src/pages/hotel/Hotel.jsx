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
import MyCalendar from './calendar.jsx'
import { useEffect } from 'react';
import { Space, Spin } from 'antd';
import axios from "axios";
import { Image } from 'antd';
import snooker from '../../photo/snooker.jpg'
import pool from '../../photo/pool.jpg'
import park from '../../photo/park.jpg'
import checkin from '../../photo/checkin.jpg'
import bed from '../../photo/bed.jpg'
import pet from '../../photo/pet.jpg'
import other from '../../photo/other.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Button, Modal } from 'antd';

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

  // img
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  // const handleMove = (direction) => {
  //   let newSlideNumber;

  //   if (direction === "l") {
  //     newSlideNumber = slideNumber === 0 ? data.photos.length : slideNumber - 1;
  //   } else {
  //     newSlideNumber = slideNumber === data.photos.length ? 0 : slideNumber + 1;
  //   }

  //   setSlideNumber(newSlideNumber);
  // };

  // const handleClick = () => {
  //   if (user) {
  //     setOpenModal(true);
  //   } else {
  //     navigate("/login");
  //   }
  // };

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  // image
  const [visible, setVisible] = useState(false);

  AOS.init();
  return (
    <div className="bg-[#f3f3f3] overflow-hidden">
      <Navbar />
      <div className="container mx-auto">
        <div  className="mt-10 mb-10">
          <div class="grid grid-rows-2 grid-flow-col gap-5 overflow-x-auto woodtable bg-center bg-cover   p-5 overflow-y-clip"> 
            <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
              {data.photos?.map((photo, i) => (
                <div class="" key={i}>
                  <Image
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    width={380}
                    height={300}
                    className=" rounded-lg object-cover"
                  />
                </div>
              ))}
            </Image.PreviewGroup>
          </div>
        </div>

        <div data-aos-duration="1500" className="w-full bg-white p-5 h-[300px]">
          <div className="grid grid-cols-2">
            <div>
              <h1 className="text-violet-800 text-3xl font-bold">{data.name}</h1>
              <p className="">
                <FontAwesomeIcon icon={faLocationDot} className="text-red-600 mr-2" />
                <label className="text-red-600 text-xl" >{data.city}</label>
              </p>
              <div className="duration-300 sm:text-xl text-gray-600 hover:text-blue-600">
                <a href={data.location}>Google map : {data.location}</a>
              </div>
              <span className="sm:text-xl">ห่าง {toKM.toFixed(2)} กม. จากทะเล</span>
              <p className="sm:text-xl ">
                ราคาเริ่มต้น {data.cheapestPrice}฿ พักได้ {data.persons} คน สูงสุด{" "}{data.maxpersons} คน
              </p>
              <span className="sm:text-xl ">
                เงินประกันความเสียหาย {data.insurance}฿
              </span>
            </div>
            <div  className="flex justify-end">
              <a onClick={showModal} className="bookNow  flex  overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                <span className="relative hidden sm:flex text-white">Reserve or </span>
                <span className="relative text-white sm:ml-1"> Book </span>
                <span className="relative hidden sm:flex text-white ml-1"> Now!</span>
              </a>
            </div>
          </div>
        </div>
        <div className="flex h-fit border border-gray-200">
          <MyCalendar startPrice={data.cheapestPrice} friPrice={data.friPrice} satPrice={data.satPrice} sunPrice={data.sunPrice} poolvilla={id} />

        </div>
        <div className="grid gap-y-10 grid-cols-1 md:grid-cols-2 mt-10">
          {/* 4 */}
          <div data-aos="fade-left" className=" bg-white bg-opacity-50 grid text-center content-center border-y border-l border-black rounded-l-md shadow-md  p-5">

            <h1 className=" text-3xl ">เวลาเข้าพัก</h1>
            <div className="" >
              Check-in : {data.checkIn} - Check-out : {data.checkOut}
            </div>



          </div>
          <div data-aos="fade-left">
            <img src={checkin} alt="snooker" className="w-full" />
          </div>
          {/* 1 */}
          
          <div data-aos="fade-right">
            <img src={snooker} alt="snooker" className="w-full" />
          </div>
          <div data-aos="fade-right" className=" bg-white bg-opacity-50 grid text-center content-center border-y border-r border-black rounded-r-md shadow-md   p-5">
            <h1 className="text-3xl font-semibold">ฟังก์ชั่น</h1>
            <div className="text-left flex justify-center">
              <div>
                <p>{data.swimmingPool === true ? "Swimming Pool" : ""}</p>
                <p>{data.slider === true ? "Slider" : ""}</p>
                <p>{data.rubberRing === true ? "Rubber Ring" : ""}</p>
                <p>{data.karaoke === true ? "Karaoke" : ""}</p>
                <p>{data.animal === true ? "Allowed Animal" : ""}</p>
                <p>{data.snooker === true ? "Snooker" : ""}</p>
                <p>{data.discoLight === true ? "Disco Light" : ""}</p>
                <p>{data.kitchenEquipment === true ? "Kitchen Equipment" : ""}</p>
                <p>{data.wifi === true ? "Free wifi" : ""}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div data-aos="fade-left" className=" bg-white bg-opacity-50 grid text-center content-center border-y border-l border-black rounded-l-md shadow-md  p-5">
            <h1 className="text-3xl ">ขนาดสระว่ายน้ำ</h1>
            <div>
              {infoSwimmingPoole?.map((item) => (
                <p>{item}</p>
              ))}
            </div>
          </div>
          <div data-aos="fade-left">
            <img src={pool} alt="snooker" className="w-full" />
          </div>
          
          {/* 3 */}
          <div data-aos="fade-right">
            <img src={park} alt="snooker" className="w-full" />
          </div>
          <div data-aos="fade-right" className=" bg-white grid text-center content-center border-y border-r border-black rounded-r-md shadow-md  p-5">
            <h1 className="text-3xl  ">ที่จอดรถ</h1>
            <div>จอดได้ {data.parkinglot} คัน</div>
          </div>

          {/* 5 */}

          <div data-aos="fade-left" className=" bg-white bg-opacity-50 grid text-center content-center border-y border-l border-black rounded-l-md shadow-md   p-5">
            <h1 className=" text-3xl ">เตียง</h1>
            <div className="flex text-left justify-center">
              <div >
                {infoBed?.map((item) => (
                  <p>{item}</p>
                ))}
              </div>
            </div >
            <h1 className=" text-2xl ">เตียงเสริม {data.addonBed}฿</h1>



          </div>
          <div data-aos="fade-left" >
            <img src={bed} alt="snooker" className="w-full" />
          </div >
          {/* 6 */}
          <div data-aos="fade-right">
            <img src={pet} alt="snooker" className="w-full" />
          </div>
          <div data-aos="fade-right" className=" bg-white bg-opacity-50 grid text-center content-center border-y border-r border-black rounded-r-md shadow-md  p-5">
            <h1 className="text-3xl divide-y">สัตว์เลี้ยง</h1>
            <div>
              {infoAnimal?.map((item) => (
                <p>{item}</p>
              ))}
            </div>
          </div>

          {/* 7 */}

          <div data-aos="fade-left" className=" bg-white bg-opacity-50 grid text-center content-center border-y border-l border-black rounded-l-md shadow-md  p-5">
            <h1 className=" text-3xl ">เพิ่มเติม</h1>
            <div>
              {infoElse?.map((item) => (
                <p>{item}</p>
              ))}
            </div>
          </div>
          <div data-aos="fade-left" >
            <img src={other} alt="snooker" className="w-full" />
          </div>
        </div>
      </div>
      <Modal title="Booking" open={isModalOpen}   width={1300} onCancel={handleCancel}  footer={[<Button key="back" onClick={handleCancel}>Cancel</Button>]}>
      {<Reserve  startPrice={data.cheapestPrice} friPrice={data.friPrice} satPrice={data.satPrice} sunPrice={data.sunPrice} poolvilla={id} poolvillaName={data.name} />}
      </Modal>
      
    </div>
  );
};

export default Hotel;

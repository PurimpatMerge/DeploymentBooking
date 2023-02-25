import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
// import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
// import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import MyCalendar from "./calendar.jsx";
import { Image } from "antd";
import snooker from "../../photo/snooker.jpg";
import pool from "../../photo/pool.jpg";
import park from "../../photo/park.jpg";
import checkin from "../../photo/checkin.jpg";
import bed from "../../photo/bed.jpg";
import pet from "../../photo/pet.jpg";
import other from "../../photo/other.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button, Modal } from "antd";
import Iframe from "react-iframe";
import { Divider } from "antd";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Space, Spin } from "antd";
import {
  faSwimmingPool,
  faLifeRing,
  faMicrophoneAlt,
  faPaw,
  faLightbulb,
  faSlidersH,
  faUtensilSpoon,
  faChessBoard,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

import { ArrowUpOutlined } from '@ant-design/icons';
const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);


  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const infoBed = data.bed?.split(",");
  const infoSwimmingPoole = data.swimmingPoolDes?.split(",");
  const infoAnimal = data.animalDes?.split(",");
  const infoElse = data.elseDes?.split(",");
  const toKM = data.distanceSea * 0.0001;

  // map
  const MapFrame = () => {
    const srcMatch = data.location?.match(/<iframe[^>]+src="([^"]+)"/i);
    const srcm = srcMatch && srcMatch[1];
    return [
      <div data-aos="flip-up">
        <Iframe
          src={srcm}
          className=" bg-white bg-opacity-50 grid text-center justify-center content-center  shadow-md w-full h-[400px]"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>,
    ];
  };

  // img
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };



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


  const [loadingscreen, setLoadingscreen] = useState(false);
  useEffect(() => {
    setLoadingscreen(true);
    setTimeout(() => {
      setLoadingscreen(false);
    }, 1000);
  }, []);

  // scroll
  const [visible2, setVisible2] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setVisible2(true);
    } else {
      setVisible2(false);
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  AOS.init();
  return (

    <>
      {loadingscreen ? (
        <>

          <div className="bg-[#C7BCA1] min-h-screen brightness-50">
            <Navbar />
            <div className="fixed h-screen z-20 top-1/2  left-1/2 -translate-x-6 -translate-y-6">
              <Space size="middle">
                <Spin
                  size="large"
                  color={"#fd912c"}
                  loadingscreen={loadingscreen}
                />
              </Space>
            </div>
          </div>
        </>
      ) : (

        <div className="bg-[#C7BCA1] overflow-hidden">
          <Navbar />
          <div className=" py-[46px]">
            <ReactNotifications />

            <div className="mt-10 mb-10">
              <div class="h-[360px] md:h-[500px] grid sm:grid-cols-2  lg:grid-cols-4 gap-5 overflow-y-auto bg-[#000000] bg-opacity-70 bg-center bg-cover p-5">
                <Image.PreviewGroup
                  preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
                >
                  {data.photos?.map((photo, i) => (
                    <div class="" key={i}>
                      <Image
                        onClick={() => handleOpen(i)}
                        src={photo}
                        alt=""
                        width={380}
                        height={300}
                        className=" rounded-lg  object-cover"
                      />
                    </div>
                  ))}
                </Image.PreviewGroup>
              </div>
            </div>
            <div className="sm:p-20 ">
              <div data-aos-duration="1500" className="w-full bg-white p-5 h-fit">
                <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2">
                  {/* col-1 */}
                  <div className="p-5 rounded-md shadow-md mx-5 pb-20">
                    <div className="flex justify-center ">
                      <div>
                        <h1 className="text-violet-800 text-3xl font-bold">
                          {data.name}
                        </h1>
                      </div>
                    </div>
                    <Divider />

                    <div className="flex">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="text-red-600 mr-2"
                      />
                      <label className="text-red-600 ">{data.city}</label>
                    </div>
                    <div className="flex justify-between">
                      <div>ห่างจากทะเล</div>
                      <div>{toKM.toFixed(2)} กม.</div>
                    </div>
                    <div className="flex justify-between">
                      <div>ราคาเริ่มต้น</div>
                      <div>{data.cheapestPrice}฿</div>
                    </div>
                    <div className="flex justify-between">
                      <div>พักได้</div>
                      <div>
                        {data.persons} คน สูงสุด {data.maxpersons} คน
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>เงินประกันความเสียหาย</div>
                      <div>{data.insurance}฿</div>
                    </div>
                    <div className="flex justify-center">เวลาเข้าพัก</div>
                    <div className="flex justify-center">
                      Check-in : {data.checkIn} - Check-out : {data.checkOut}
                    </div>
                    <div>
                      <Divider />
                      <a
                        onClick={showModal}
                        className="bookNow  flex  overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500"
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                        <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                        <span className="relative hidden sm:flex text-white">
                          Reserve or{" "}
                        </span>
                        <span className="relative text-white sm:ml-1"> Book </span>
                        <span className="relative hidden sm:flex text-white ml-1">
                          {" "}
                          Now!
                        </span>
                      </a>
                    </div>
                  </div>
                  {/* col-2 */}
                  <div className=" border  border-gray-200">
                    <MyCalendar
                      startPrice={data.cheapestPrice}
                      friPrice={data.friPrice}
                      satPrice={data.satPrice}
                      sunPrice={data.sunPrice}
                      poolvilla={id}
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:gap-y-10  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-10 ">
                {/* 1 */}

                <div data-aos="flip-up" >
                  <img src={checkin} alt="snooker" className="w-full h-[400px]" />
                </div>
                <MapFrame />
                {/* 2 */}
                <div data-aos="flip-up" className="lg:ml-10 sm:mt-0 mt-10">
                  <img src={snooker} alt="snooker" className="w-full h-[400px] " />
                </div>
                <div
                  data-aos="flip-up"
                  className="bg-white bg-opacity-90 grid text-center    shadow-md h-[400px]   p-5"
                >

                  <h1 className="text-xl ">ฟังก์ชั่น</h1>
                  <Divider />
                  <div className="text-left text-small flex justify-center">
                    <div class="grid grid-cols-3 gap-4">
                      {data.swimmingPool === true && (
                        <div class="flex flex-col items-center justify-center bg-white h-[80px] lg:h-[80px] lg:w-[120px] shadow-md shadow-purple-500/50 p-2 rounded-lg">
                          <FontAwesomeIcon icon={faSwimmingPool} size="small" />
                          <p class="mt-2 text-purple-800  text-center">
                            Swimming Pool
                          </p>
                        </div>
                      )}
                      {data.slider === true && (
                        <div class="flex flex-col items-center justify-center bg-white h-[80px] lg:h-[80px] lg:w-[120px] shadow-md shadow-purple-500/50 p-4 rounded-lg">
                          <FontAwesomeIcon icon={faSlidersH} size="small" />
                          <p class="mt-2 text-purple-800 text-center">Slider</p>
                        </div>
                      )}
                      {data.rubberRing === true && (
                        <div class="flex flex-col items-center justify-center bg-white h-[80px] lg:h-[80px] lg:w-[120px] shadow-md shadow-purple-500/50 p-4 rounded-lg">
                          <FontAwesomeIcon icon={faLifeRing} size="small" />
                          <p class="mt-2 text-purple-800 text-center">Rubber Ring</p>
                        </div>
                      )}
                      {data.karaoke === true && (
                        <div class="flex flex-col items-center justify-center bg-white h-[80px] lg:h-[80px] lg:w-[120px] shadow-md shadow-purple-500/50 p-4 rounded-lg">
                          <FontAwesomeIcon icon={faMicrophoneAlt} size="small" />
                          <p class="mt-2 text-purple-800 text-center">Karaoke</p>
                        </div>
                      )}
                      {data.animal === true && (
                        <div class="flex flex-col items-center justify-center bg-white h-[80px] lg:h-[80px] lg:w-[120px] shadow-md shadow-purple-500/50 p-4 rounded-lg">
                          <FontAwesomeIcon icon={faPaw} size="small" />
                          <p class="mt-2 text-purple-800 text-center">
                            Allowed Animal
                          </p>
                        </div>
                      )}
                      {data.snooker === true && (
                        <div class="flex flex-col items-center justify-center bg-white h-[80px] lg:h-[80px] lg:w-[120px] shadow-md shadow-purple-500/50 p-4 rounded-lg">
                          <FontAwesomeIcon icon={faChessBoard} size="small" />
                          <p class="mt-2 text-purple-800 text-center">Snooker</p>
                        </div>
                      )}
                      {data.discoLight === true && (
                        <div class="flex flex-col items-center justify-center bg-white h-[80px] lg:h-[80px] lg:w-[120px] shadow-md shadow-purple-500/50 p-4 rounded-lg">
                          <FontAwesomeIcon icon={faLightbulb} size="small" />
                          <p class="mt-2 text-purple-800 text-center">Disco Light</p>
                        </div>
                      )}
                      {data.kitchenEquipment === true && (
                        <div class="flex flex-col items-center justify-center bg-white h-[80px] lg:h-[80px] lg:w-[120px] shadow-md shadow-purple-500/50 p-4 rounded-lg">
                          <FontAwesomeIcon icon={faUtensilSpoon} size="small" />
                          <p class="mt-2 text-purple-800 text-center">
                            Kitchen Equipment
                          </p>
                        </div>
                      )}
                      {data.wifi === true && (
                        <div class="flex flex-col items-center justify-center bg-white h-[80px] lg:h-[80px] lg:w-[120px] shadow-md shadow-purple-500/50 p-4 rounded-lg">
                          <FontAwesomeIcon icon={faWifi} size="small" />
                          <p class="mt-2 text-purple-800 text-center">Free wifi</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3 */}
                
                <div data-aos="flip-up">
                  <img src={pool} alt="snooker" className="w-full h-[400px] sm:mt-0 mt-10" />
                </div>
                <div
                  data-aos="flip-up"
                  className=" bg-white  grid text-center content-center  shadow-md  p-5"
                >
                  <h1 className="text-4xl ">ขนาดสระว่ายน้ำ</h1>
                  <div>
                    {infoSwimmingPoole?.map((item) => (
                      <p className="text-xl">{item}</p>
                    ))}
                  </div>
                </div>
                {/* 4 */}
                <div data-aos="flip-up" className="lg:ml-10">
                  <img src={park} alt="snooker" className="w-full h-[400px] sm:mt-0 mt-10" />
                </div>
                <div
                  data-aos="flip-up"
                  className=" bg-white bg-opacity-90 grid text-center content-center  shadow-md  p-5"
                >
                  <h1 className="text-4xl  ">ที่จอดรถ</h1>
                  <div className="text-xl">จอดได้ {data.parkinglot} คัน</div>
                </div>

                {/* 5 */}
                
                <div data-aos="flip-up">
                  <img src={bed} alt="snooker" className="w-full h-[400px] sm:mt-0 mt-10" />
                </div>
                <div
                  data-aos="flip-up"
                  className=" bg-white bg-opacity-90 grid text-center content-center  shadow-md   p-5"
                >
                  <h1 className=" text-4xl ">เตียง</h1>
                  <div className="flex text-left justify-center">
                    <div>
                      {infoBed?.map((item) => (
                        <p className="text-xl">{item}</p>
                      ))}
                    </div>
                  </div>
                  <h1 className=" text-2xl ">เตียงเสริม {data.addonBed}฿</h1>
                </div>
                {/* 6 */}
                <div data-aos="flip-up" className="lg:ml-10">
                  <img src={pet} alt="snooker" className="w-full h-[400px] sm:mt-0 mt-10" />
                </div>
                <div
                  data-aos="flip-up"
                  className=" bg-white bg-opacity-90 grid text-center content-center  shadow-md  p-5"
                >
                  <h1 className="text-4xl divide-y">สัตว์เลี้ยง</h1>
                  <div>
                    {infoAnimal?.map((item) => (
                      <p className="text-xl">{item}</p>
                    ))}
                  </div>
                </div>

                {/* 7 */}
                
                <div data-aos="flip-up">
                  <img src={other} alt="snooker" className="w-full h-[400px] sm:mt-0 mt-10" />
                </div>
                <div
                  data-aos="flip-up"
                  className=" bg-white  grid text-center content-center  shadow-md  p-5"
                >
                  <h1 className=" text-4xl ">เพิ่มเติม</h1>
                  <div>
                    {infoElse?.map((item) => (
                      <p className="text-xl">{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Modal
              title="Booking"
              open={isModalOpen}
              width={1300}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Cancel
                </Button>,
              ]}
            >
              {
                <Reserve
                  startPrice={data.cheapestPrice}
                  friPrice={data.friPrice}
                  satPrice={data.satPrice}
                  sunPrice={data.sunPrice}
                  poolvilla={id}
                  poolvillaName={data.name}
                />
              }
            </Modal>
          </div>
        </div>
      )}
      {visible2 && (
        <Button
          type="primary"
          shape="circle"
          icon={<ArrowUpOutlined className="text-xl top-[2px] absolute left-[9px]" />}
          size="large"
          className="scroll-top-button bg-purple-600 duration-150"
          onClick={handleScrollTop}
        />
      )}
    </>















  );
};

export default Hotel;

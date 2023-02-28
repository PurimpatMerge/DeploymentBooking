import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import BotFooter from "../../components/footer/FooterText";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Introtext from "../../components/featured/Introtext";
import "../../input.css";
import { useState, useEffect } from "react";
import { Space, Spin } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

import './home.css'

const Home = () => {
  AOS.init();

  const [loadingscreen, setLoadingscreen] = useState(false);
  useEffect(() => {
    setLoadingscreen(true);
    setTimeout(() => {
      setLoadingscreen(false);
    }, 1000);
  }, []);

  // scroll
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {loadingscreen ? (
        <>
          <div className="bg-[#edede9]  brightness-50">
            <Navbar />
            <Footer />
            <Header />
            <Introtext />
            <Featured />
            <FeaturedProperties />
          </div>
          <div className="fixed h-screen z-20 top-1/2  left-1/2 -translate-x-6 -translate-y-6">
            <Space size="middle">
              <Spin
                size="large"
                color={"#fd912c"}
                loadingscreen={loadingscreen}
              />
            </Space>
          </div>
        </>
      ) : (
        <div className="bg-[#edede9] overflow-hidden">
          <Navbar />
          <Footer />
          <Header />
          <Introtext />
          <div data-aos="fade-up " className="bg-[#000000] bg-opacity-90 py-5 mt-20">
            <Featured />
          </div>
          <div data-aos="fade-up">
            <FeaturedProperties />
          </div>
          {visible && (
            <Button
              type="primary"
              shape="circle"
              icon={<ArrowUpOutlined className="text-xl top-[2px] absolute left-[9px]" />}
              size="large"
              className="scroll-top-button bg-purple-600 duration-150"
              onClick={handleScrollTop}
            />
          )}

          <BotFooter/>
      
        </div>
      )}
    </>
  );
};

export default Home;

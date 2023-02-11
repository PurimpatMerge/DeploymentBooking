import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Introtext from "../../components/featured/Introtext";
import "../../input.css";
import { useState, useEffect } from 'react';
import { Space, Spin } from 'antd';
const Home = () => {


  const [loadingscreen, setLoadingscreen] = useState(false);
  useEffect(() => {
    setLoadingscreen(true)
    setTimeout(() => {
      setLoadingscreen(false)
    }, 1000)
  }, [])

  return (
    <>

      {

        loadingscreen ?
          <>
            <div className="bg-white brightness-50">
              <Navbar />
              <Footer />
              <Header />
              <Introtext />
              <Featured />
              <FeaturedProperties />
            </div>
            <div className='fixed h-screen z-20 top-1/2  left-1/2 -translate-x-6 -translate-y-6'>
              <Space size="middle">
              <Spin size="large" 
                color={"#fd912c"}
                loadingscreen={loadingscreen}
              />
              </Space>
            </div>
          </>
          :
          <div className="bg-white">
            <Navbar />
            <Footer />
            <Header />
            <Introtext />
            <Featured />
            <FeaturedProperties />
          </div>
      }


    </>


  );
};

export default Home;

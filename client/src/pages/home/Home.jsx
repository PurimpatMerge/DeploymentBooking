import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
        <Footer/>
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties/>
      </div>
    </div>
  );
};

export default Home;

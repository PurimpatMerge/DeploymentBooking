import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";

import "../../input.css";

const Home = () => {
  return (
    <div className="flex bg-gradient-to-bl shadow-lg from-indigo-300 to-purple-400">
  <div className="">
    <Navbar />
    <Footer />
    <div className="mt-4  "><Header /></div>
    <div className="">
      <Featured style="z-index: -1;" />
      <h1 className="tracking-tight text-center   font-semibold text-4xl  text-zinc-900 ">Homes guests love</h1>
      <div className="flex  bg-slate-500 bg-opacity-30  ">
        <div className="mx-auto">
          <FeaturedProperties />
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Home;

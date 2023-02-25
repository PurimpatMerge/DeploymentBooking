import useFetch from "../../hooks/useFetch";
import pattayabg from "../../photo/pattayaimg";
import bsbg from "../../photo/cmbg";
import cmbg from "../../photo/bsbg";
import { Carousel } from "antd";
const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Pattaya,Bangsean,Bangsalay"
  );

  return (
    <div className="">
      <div className=" container mx-auto">
        {loading ? (
          "Loading please wait"
        ) : (
          <Carousel autoplay>
            <div className="relative">
              <img
                src={pattayabg}
                alt=""
                className="z-0 object-cover h-[450px] w-full  blur-[1px]"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-3xl font-semibold text-gray-300">
                <p>Location:Pattaya</p>
                <p>{data[0]} properties</p>
              </div>
            </div>
            <div className="relative">
              <img
                src={bsbg}
                alt=""
                className="object-cover h-[450px] w-full blur-[1px]"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-3xl font-semibold text-gray-300">
                <p>Location:Bangsean</p>
                <p>{data[1]} properties</p>
              </div>
            </div>
            <div className="relative">
              <img
                src={cmbg}
                alt=""
                className="object-cover h-[450px] w-full  blur-[1px]"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-3xl font-semibold text-gray-300">
                <p>Location:Bangsalay</p>
                <p>{data[2]} properties</p>
              </div>
            </div>
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default Featured;

import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    `/hotels?city=${"a"}&min=${0}&max=${99999}&maxpersons=${1}&sea=${90}&limit=6`
  );

  const [destination, setDestination] = useState("");
  const [person, setperson] = useState("");
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, person } });
    navigate("/hotels", { state: { destination, dates, person } });
  };

  return (
    <div className="container mx-auto ">
      {loading ? (
        "Loading"
      ) : (
        <>
          <div className="mt-5">
            <p className="text-4xl font-bold text-[#51d6ca]">Rooms</p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit
              distinctio, pariatur explicabo cum dignissimos obcaecati tenetur
              necessitatibus accusantium aspernatur quae laboriosam suscipit
              repellendus nobis aut voluptas similique mollitia nulla quisquam.
            </p>
          </div>
          <div className="flex justify-center flex-wrap ">
            {data.map((item) => (
              <div className="p-10">
                <div
                  className="sm:w-[400px]  bg-white bg-opacity-80 h-[400px] rounded-lg overflow-hidden shadow-lg duration-200  hover:scale-110"
                  key={item._id}
                >
                  <img
                    className="w-[100%] h-[200px]"
                    src={item.photos[0]}
                    alt=""
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{item.name}</div>
                    <p className="text-gray-700 text-base">{item.city}</p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      Starting from {item.cheapestPrice} ฿
                    </span>
                    {item.rating && (
                      <div className="fpRating">
                        <span>Excellent</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pb-5">
            <button
              className="border hover:border-black hover:text-black hover:bg-white px-[25px] py-[10px] rounded-md hover:scale-105 shadow-xl border-[#51d6ca] bg-[#51d6ca] text-black font-semibold hover:text-xl duration-200 "
              onClick={handleSearch}
            >
              <p className="">ดูทั้งหมด</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;

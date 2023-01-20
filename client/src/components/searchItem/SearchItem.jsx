import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  const toKM = item?.distanceSea * 0.0001;

  return (
    <div className="container mt-5 sm:mt-0">
      <div className=" bg-white bg-opacity-60 sm:w-[650px] sm:h-[250px] shadow-lg flex overflow-hidden rounded-lg">
        <div className="  w-6/12">
          <div className="my-5 mx-5 ">
            <img src={item.photos[0]} alt="" className="w-full rounded-sm h-[200px]" />
          </div>
        </div>
        <div className=" w-6/12">
          <div className="mx-5 my-5 border-b border-slate-400">
            <div className="flex justify-between mb-1">
              <h1 className="font-semibold text-xl text-fuchsia-800">{item.name}</h1>
              <div>
              <p className="float-right">{item.cheapestPrice}฿</p>
              
              </div>
            </div>
            <p className="text-xs text-gray-500 ">ประกันความเสียหาย {item.insurance}฿</p>
          </div>
          <div className="mx-5">
            <p>จำนวนคน {item.persons} สูงสุดถึง {item.maxpersons}</p>
            <p>{toKM.toFixed(2)}กม จากทะเล</p>
            <p className="font-medium text-blue-600">{item.city}</p>
          </div>
          <div className="float-right mx-5 my-5">
          <Link to={`/hotels/${item._id}`}>
          <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">ดูรายละเอียด</button>
          </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default SearchItem;

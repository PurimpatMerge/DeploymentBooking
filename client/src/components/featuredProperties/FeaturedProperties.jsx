import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import bg from '../../photo/beautibg.jpg'
const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    `/hotels?city=${"a"}&min=${0}&max=${99999}&maxpersons=${1}&sea=${90}&limit=4`
  );
  return (
    <div className="container mx-auto ">
      {loading ? (
        "Loading"
      ) : (
        <div className="flex justify-center flex-wrap ">
          {data.map((item) => (
            <div class="p-10">
              <div
                class="w-[400px] lg:w-[300px] bg-white bg-opacity-80 h-[400px] rounded-lg overflow-hidden shadow-lg duration-200  hover:scale-110"
                key={item._id}
              >
                <img class="w-[100%] h-[200px]" src={item.photos[0]} alt="" />
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">{item.name}</div>
                  <p class="text-gray-700 text-base">{item.city}</p>
                </div>
                <div class="px-6 pt-4 pb-2">
                  <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
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
      )}
    </div>
  );
};

export default FeaturedProperties;

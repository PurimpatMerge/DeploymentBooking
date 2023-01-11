import useFetch from "../../hooks/useFetch";


const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Pattaya,Bangsean,Changmai"
  );

  return (
    <div className="container mx-auto my-10 ">
      {loading ? (
        "Loading please wait"
      ) : (
        <div className="flex">
          <div className="relative">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className="rounded-lg w-11/12  "
            />
            <div className="absolute bottom-10 left-10 text-lg ">
              <h1>Pattaya</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className="rounded-lg w-11/12 opacity-80"
            />
            <div className="absolute bottom-10 left-10 text-lg">
              <h1>Bangsean</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className="rounded-lg w-11/12 opacity-80"
            />
            <div className="absolute bottom-10 left-10 text-lg">
              <h1>Changmai</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Featured;

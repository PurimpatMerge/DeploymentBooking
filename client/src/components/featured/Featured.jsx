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
            <h1 className="mb-1 font-mono text-base text-gray-100 md:text-base">
                Location: <br className="block md:hidden" />
                <span
                  className="inline-flex h-20 pt-2 overflow-x-hidden animate-type group-hover:animate-type-reverse whitespace-nowrap text-brand-accent will-change-transform"
                >
                  ChiangMai
                </span>
                <span
                  className="box-border inline-block w-1 h-7 ml-2 -mb-2 bg-white md:-mb-2 md:h-7 animate-cursor will-change-transform"
                ></span>
              </h1>
              <h2 className="text-white text-sm">{data[0]} properties</h2>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className="rounded-lg w-11/12 opacity-80"
            />
            <div className="absolute bottom-10 left-10 text-lg">

              <h1 className="mb-1 font-mono text-base text-gray-100 md:text-base">
                Location: <br className="block md:hidden" />
                <span
                  className="inline-flex h-20 pt-2 overflow-x-hidden animate-type group-hover:animate-type-reverse whitespace-nowrap text-brand-accent will-change-transform"
                >
                  Bangsean
                </span>
                <span
                  className="box-border inline-block w-1 h-7 ml-2 -mb-2 bg-white md:-mb-2 md:h-7 animate-cursor will-change-transform"
                ></span>
              </h1>

              <h2 className="text-white text-sm">{data[1]} properties</h2>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className="rounded-lg w-11/12 opacity-80"
            />
            <div className="absolute bottom-10 left-10 text-lg">
            <h1 className="mb-1 font-mono text-base text-gray-100 md:text-base">
                Location: <br className="block md:hidden" />
                <span
                  className="inline-flex h-20 pt-2 overflow-x-hidden animate-type group-hover:animate-type-reverse whitespace-nowrap text-brand-accent will-change-transform"
                >
                  ChiangMai
                </span>
                <span
                  className="box-border inline-block w-1 h-7 ml-2 -mb-2 bg-white md:-mb-2 md:h-7 animate-cursor will-change-transform"
                ></span>
              </h1>
              <h2 className="text-white text-sm">{data[2]} properties</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Featured;

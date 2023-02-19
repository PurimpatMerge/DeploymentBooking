import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const handlelogout = async () => {
    try {
      logout();
    } catch (err) { }
  };

  async function logout() {
    try {
      localStorage.clear();
      sessionStorage.clear();
      indexedDB.deleteDatabase('firebaseLocalStorageDb');
      indexedDB.deleteDatabase('firebaseLocalStorageDb-shm');
      indexedDB.deleteDatabase('firebaseLocalStorageDb-wal');
      caches.keys().then(function (cacheNames) {
        cacheNames.forEach(function (cacheName) {
          caches.delete(cacheName);
        });
      });
      window.location.href = '/';
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="bg-[#2C016D] py-5 shadow-lg">
      <div className="container mx-auto  flex justify-between">
        <div className="border border-white p-2 rounded-md duration-300 hover:scale-125">
        <div className="my-auto">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <button className="font-semibold text-white text-xl tracking-tight duration-300 hover:scale-105 ">
              PoolVilla
            </button>
          </Link>
        </div>
        </div>
        <div className="my-auto">
            {user ? (
              <div >

                <Link
                  to="/profile"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <button className="ml-5 text-white font-semibold text-xl tracking-tight duration-300 hover:scale-125">{user.username}</button>
                </Link>
                <button
                  className="inline-block  text-sm px-4 ml-5 py-2 leading-none border rounded text-white border-white hover:border-transparent duration-500 hover:scale-125  hover:text-indigo-500 hover:bg-white mt-4 lg:mt-0"
                  onClick={() => handlelogout()}
                >
                  logout
                </button>
              </div>
            ) : (
              <div className="">
                <Link
                  to="/register"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <button className="inline-block  text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent duration-500 hover:text-indigo-500 hover:scale-125 hover:bg-white mt-4 lg:mt-0">
                    Register
                  </button>
                </Link>
                <Link
                  to="/login"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <button className="inline-block  text-sm px-4 ml-5 py-2 leading-none border rounded text-white border-white hover:border-transparent duration-500 hover:scale-125  hover:text-indigo-500 hover:bg-white mt-4 lg:mt-0">
                    Login
                  </button>
                </Link>
              </div>
            )}
          
        </div>
      </div>


      
    </div>
  );
};

export default Navbar;

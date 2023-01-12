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
    } catch (err) {}
  };
  
  async function logout() {
    try {
      localStorage.clear();
      sessionStorage.clear();
      indexedDB.deleteDatabase('firebaseLocalStorageDb');
      indexedDB.deleteDatabase('firebaseLocalStorageDb-shm');
      indexedDB.deleteDatabase('firebaseLocalStorageDb-wal');
      caches.keys().then(function(cacheNames) {
        cacheNames.forEach(function(cacheName) {
          caches.delete(cacheName);
        });
      });
      window.location.href = '/';
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="bg-[#2e1c2e]">
      <nav class="container mx-auto flex items-center  justify-between    p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <button className="font-semibold text-xl tracking-tight duration-300 hover:scale-125 ">
              PoolVilla
            </button>
          </Link>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow"></div>
          {user ? (
            <div>
               <button
               className="deleteButton"
               onClick={() => handlelogout()}
             >
               logout
             </button>
            <Link
              to="/profile"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <button>{user.username}</button>
            </Link>
            </div>
          ) : (
            <div className="float-right">
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
      </nav>
    </div>
  );
};

export default Navbar;

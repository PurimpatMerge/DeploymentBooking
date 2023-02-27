import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Menu } from "antd";
import React, { useState } from "react";
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
      indexedDB.deleteDatabase("firebaseLocalStorageDb");
      indexedDB.deleteDatabase("firebaseLocalStorageDb-shm");
      indexedDB.deleteDatabase("firebaseLocalStorageDb-wal");
      caches.keys().then(function (cacheNames) {
        cacheNames.forEach(function (cacheName) {
          caches.delete(cacheName);
        });
      });
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    }
  }

  const items = [
    {
      label: `${user?.username}`,
      key: "SubMenu",
      children: [
        {
          label: "Profile",
          key: "myProfile",
        },
        {
          label: "Tracking",
          key: "tracking",
        },
        {
          label: "Logout",
          key: "3",
        },
      ],
    },
  ];

  const onClick = (e) => {
    if (e.key !== "3") {
      window.location.href = `/${e.key}`;
    } else {
      handlelogout();
    }
  };

  return (
    <div className="bg-[#000000] bg-opacity-95 py-5 fixed w-screen z-20 top-0 shadow-lg">
      <div className="px-2 sm:px-0 sm:container mx-auto  flex justify-between">
        <div className="border border-white p-2 rounded-md duration-300 hover:scale-125">
          <div className="my-auto">
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <button className="font-semibold text-white text-xl tracking-tight duration-300 hover:scale-105 ">
                PoolVilla
              </button>
            </Link>
          </div>
     <Link to="/myProfile" style={{ color: "inherit", textDecoration: "none" }}>
              <button className="font-semibold text-white text-xl tracking-tight duration-300 hover:scale-105 ">
                profile
              </button>
            </Link>
        </div>
        <div className="my-auto">
          {user ? (
            <div>
              <Menu
                onClick={onClick}
                style={{ fontSize: "20px", color: "#ffffff" }}
                className="bg-transparent  tracking-tight   "
                mode="horizontal"
                items={items}
              />
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

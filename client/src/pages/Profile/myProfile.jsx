import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { profile } from "../../formSource";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from 'antd';
import "../Profile/editProfile.css"
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Card, Avatar  } from 'antd';

import React from 'react';
import { Fragment } from 'react';

const Profile = (props) => {
  const { username, email, phone, lineId } = props;

  return (
    <Fragment>
      <div className="bg-white max-w-md mx-auto rounded-md overflow-hidden shadow-md">
        <div className="p-4">
          <div className="flex items-center">
            <div className="text-lg font-semibold">{username}</div>
          </div>
          <div className="mt-3 text-gray-500">{email}</div>
          <div className="mt-3 text-gray-700">Phone: {phone}</div>
          <div className="mt-1 text-gray-700">Line ID: {lineId}</div>
        </div>
      </div>
    </Fragment>
  );
};
const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/users/${user._id}`);

  return (
    <div className="bgedit bg-cover object-cover h-screen flex-col">
      <div className="justify-right mx-10 py-10">
      <Link to='/tracking'>
        <Button className="bg-blue-500" type="primary">Tracking</Button>
      </Link>
      </div>
      <ReactNotifications />
      <div className="container mx-auto p-10  sm:w-5/12 bg-white bg-opacity-60  rounded-lg ">
        <div className="w-full  mx-auto my-12 ">
          <div className="flex ">
            <h1 className="text-2xl font-extrabold text-black mx-auto">Profile</h1>
          </div>

          <Profile 
        username={data.username}
        email={data.email}
        phone={data.phone}
        lineId={data.lineId}
      />

        </div>
        <Link
                  to="/profile"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <button className="ml-5  font-semibold text-xl tracking-tight duration-300 hover:scale-125">Edit</button>
                </Link>
      </div>
    </div>


  );
};

export default EditProfile;

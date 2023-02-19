import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "antd";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import React from "react";
import { Card, Avatar } from "antd";

const { Meta } = Card;

const Profile = (props) => {
  const { username, email, phone, lineId } = props;

  return (
    <Card>
      <Meta
        avatar={<Avatar src="https://example.com/avatar.jpg" />}
        title={username}
        description={email}
      />
      <p>Phone: {phone}</p>
      <p>Line ID: {lineId}</p>
    </Card>
  );
};
const ProfileAdmin = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/users/${user._id}`);
  console.log(data);
  return (
    <div className="bgedit bg-cover object-cover h-screen flex-col">
      <ReactNotifications />
      <div className="container mx-auto p-10  sm:w-5/12 bg-white bg-opacity-60  rounded-lg ">
        <div className="w-full  mx-auto my-12 ">
          <div className="flex ">
            <h1 className="text-2xl font-extrabold text-black mx-auto">
              Profile
            </h1>
          </div>

          <Profile
            username={data.username}
            email={data.email}
            phone={data.phone}
            lineId={data.lineId}
          />
        </div>
        <Link to={`/profile/${user._id}`} style={{ color: "inherit", textDecoration: "none" }}>
  <button className="ml-5 font-semibold text-xl tracking-tight duration-300 hover:scale-125">
    Edit
  </button>
</Link>

      </div>
    </div>
  );
};

export default ProfileAdmin;

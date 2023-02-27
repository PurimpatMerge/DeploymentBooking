import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../Profile/editProfile.css";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Divider } from "antd";
import Navbar from "../../components/navbar/Navbar";

const Profile = (props) => {
  const { username, email, phone, lineId } = props;

  return (
    <>
      <div>
        <h1 className="text-4xl flex font-bold text-black justify-center">
          Profile
        </h1>
        <Divider />
        <div className="p-4 text-lg">
          <div className="">Username: {username}</div>
          <div className="mt-2">Email: {email}</div>
          <div className="mt-2">Phone: {phone}</div>
          <div className="mt-2">Line ID: {lineId}</div>
        </div>
      </div>
    </>
  );
};
const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/users/${user._id}`);

  return (
    <div className="bgedit bg-cover object-cover h-screen flex-col">
      <Navbar />
      <ReactNotifications />
      {loading ? (
          "Loading please wait"
        ) : (
      <div className="container mx-auto p-10 mt-32  sm:w-5/12 backdrop-blur-sm bg-white/30 border border-gray-400  rounded-lg ">
        <div className="w-full  mx-auto my-12 ">
          <div className="flex "></div>

          <Profile
            username={data?.username}
            email={data?.email}
            phone={data?.phone}
            lineId={data?.lineId}
          />
        </div>
        <div className="flex justify-end">
          <Link
            to="/profile"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <button className="bg-yellow-500 text-white font-semibold py-3 px-10 rounded-md  tracking-tight duration-300 hover:scale-105">
              Edit
            </button>
          </Link>
        </div>
      </div>
 )}
    </div>
  );
};

export default EditProfile;

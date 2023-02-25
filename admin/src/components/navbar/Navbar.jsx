import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import useFetch from "../../hooks/useFetch";
import profile from './Logo.JPG'
const Navbar = () => {
  const { data, loading, error } = useFetch(`/dashmerge/count`);
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      {loading ? null : (
        <div className="wrapper">
          <div className="search"></div>
          <div className="items">
            <div className="item">
              <DarkModeOutlinedIcon
                className="icon"
                onClick={() => dispatch({ type: "TOGGLE" })}
              />
            </div>

            <div className="item">
              <NotificationsNoneOutlinedIcon className="icon" />
              <div className="counter">{data.pending}</div>
            </div>

            <div className="item">
              <img
                src={profile}
                alt=""
                className="avatar"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

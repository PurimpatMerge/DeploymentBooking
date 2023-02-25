import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import useFetch from "../../hooks/useFetch";

const Widget = ({ type }) => {
  const { data, loading, error } = useFetch(`/dashmerge/count`);
  let dataMock;

  //temporary
  const diff = 20;

  switch (type) {
    case "user":
      dataMock = {
        title: "USERS",
        isMoney: false,
        count: data?.countNonAdmin || 0,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "Booking":
      dataMock = {
        title: "BOOKING ",
        isMoney: false,
        count: data?.approve || 0,
        link: "View all booking",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "Total":
      dataMock = {
        title: "EARNINGS",
        isMoney: true,
        count: data?.totalBookingPrice || 0,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "Pool Villa":
      dataMock = {
        title: "POOL VILLA",
        isMoney: false,
        count: data?.poolVilla || 0,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{dataMock.title}</span>
        <span className="counter">
          {dataMock.isMoney && "฿"} {dataMock.count}
        </span>
        <span className="link">{dataMock.link}</span>
      </div>
      <div className="right">
        {/* <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div> */}
        {dataMock.icon}
      </div>
    </div>
  );
};

export default Widget;

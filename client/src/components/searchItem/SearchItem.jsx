import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  const toKM = item?.distanceSea * 0.0001;

  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siTaxiOp">จำนวนคน {item.persons} สูงสุดถึง {item.maxpersons}</span>
        <span className="siDistance">{toKM.toFixed(2)}กม จากทะเล</span>
        <span className="siCancelOp">{item.city} </span>
      </div>
      <div className="siDetails">
        <div className="siDetailTexts">
          <span className="siPrice">{item.cheapestPrice}฿</span>
          <span className="siTaxOp">ประกันความเสียหาย {item.insurance}฿</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">ดูรายละเอียด</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;

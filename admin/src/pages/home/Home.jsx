import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
// import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="Booking" />
          <Widget type="Total" />
          <Widget type="Pool Villa" />
        </div>
        <div className="charts">
          <Chart title="Last 6 Months (Revenue)" aspect={4 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Top 5 most booked</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;

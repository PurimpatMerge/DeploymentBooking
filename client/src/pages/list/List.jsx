import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import { useEffect } from "react";
import { Space, Spin } from "antd";
import { Button } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import BotFooter from "../../components/footer/FooterText";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const List = () => {
  const [loadingscreen, setLoadingscreen] = useState(false);
  useEffect(() => {
    setLoadingscreen(true);
    setTimeout(() => {
      setLoadingscreen(false);
    }, 1000);
  }, []);

  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [person, setperson] = useState(location.state.person);
  const [sea, setSea] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination || "a"}&min=${min || 0}&max=${
      max || 99999
    }&maxpersons=${person || 1}&sea=${sea || 90}`
  );

  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const totalPages = Math.ceil(data?.length / perPage);
  const paginatedData = data?.slice((page - 1) * perPage, page * perPage);

  function handlePageChange(event, value) {
    setPage(value);
  }

  const handleClick = () => {
    reFetch();
  };

  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  // scroll
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      {loadingscreen ? (
        <>
         <Navbar />
          <div className="bg-[#edede9] brightness-50">
          </div>
          <div className="fixed h-screen z-20 top-1/2  left-1/2 -translate-x-6 -translate-y-6">
            <Space size="middle">
              <Spin
                size="large"
                color={"#fd912c"}
                loadingscreen={loadingscreen}
              />
            </Space>
          </div>
        </>
      ) : (
        <>
            <div className="fixed w-screen z-20">
          <Navbar />
        </div>
          <div className="min-w-max min-h-screen bg-[#edede9] pt-5 relative pb-20 overflow-hidden">
            
            {/* <button onClick={handleToggle}><TbListSearch className="lg:hidden text-3xl fixed text-yellow-400  "/></button> */}

            <Header type="list" />
            <div className="listContainer  justify-center ">
              <div className="gap-[30px] lg:flex">
                {/* when hidden i want some button to show this component again */}
                <div className="listSearch  border border-black shadow-lg block 2xl:fixed left-10">
                  <h1 className="lsTitle">Search</h1>
                  <div className="lsItem">
                    <label>Destination</label>
                    <input
                      placeholder={destination}
                      type="text"
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                  <div className="lsItem">
                    <label>Check-in Date</label>
                    <span onClick={() => setOpenDate(!openDate)}>{`${format(
                      dates[0].startDate,
                      "MM/dd/yyyy"
                    )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                    {openDate && (
                      <DateRange
                        onChange={(item) => setDates([item.selection])}
                        minDate={new Date()}
                        ranges={dates}
                      />
                    )}
                  </div>
                  <div className="lsItem">
                    <label>Options</label>
                    <div className="lsOptions">
                      <div className="lsOptionItem">
                        <span className="lsOptionText">
                          Min price <small>per night</small>
                        </span>
                        <input
                          type="number"
                          onChange={(e) => setMin(e.target.value)}
                          className="lsOptionInput"
                        />
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText">
                          Max price <small>per night</small>
                        </span>
                        <input
                          type="number"
                          onChange={(e) => setMax(e.target.value)}
                          className="lsOptionInput"
                        />
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText">person</span>
                        <input
                          type="number"
                          placeholder={person}
                          onChange={(e) => setperson(e.target.value)}
                          className="lsOptionInput"
                        />
                      </div>
                      <div className="lsOptionItem">
                        <span className="lsOptionText">from Sea</span>
                        <input
                          type="number"
                          onChange={(e) => setSea(e.target.value)}
                          className="lsOptionInput"
                        />
                      </div>
                    </div>
                  </div>
                  <button className="rounded-md  " onClick={handleClick}>
                    Search
                  </button>
                </div>
                <div className={classes.root}>
                  <div className="listResult">
                    {loading ? (
                      <Space size="middle">
                      <Spin
                        size="large"
                        color={"#fd912c"}
                        loadingscreen={loadingscreen}
                      />
                    </Space>
                    ) : (
                      <>
                        <div className="2xl:ml-[150px] grid gap-10   2xl:grid-cols-2">
                          {paginatedData.map((item) => (
                            <SearchItem item={item} key={item._id} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex justify-center ">
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handlePageChange}
                      showFirstButton
                      showLastButton
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 absolute bottom-0">

            <BotFooter/>
            </div>
          </div>
          {visible && (
        <Button
          type="primary"
          shape="circle"
          icon={<ArrowUpOutlined className="text-xl top-[2px] absolute left-[9px]"/>}
          size="large"
          className="scroll-top-button bg-purple-600 duration-150"
          onClick={handleScrollTop}
        />
      )}
        </>
      )}
    </>
  );
};

export default List;

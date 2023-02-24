import { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { Table, Space, Tag, Image, Input } from 'antd';
import "../Profile/editProfile.css"
import Navbar from "../../components/navbar/Navbar";
import { Divider } from 'antd';
const { Search } = Input;
const Tracking = () => {
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useFetch(`/booking/tracking/${user.username}/${user.email}`);
  const [searchText, setSearchText] = useState('');
  const columns = [
    {
      title: 'Poolvilla Name',
      dataIndex: 'poolvillaName',
      key: 'poolvillaName',
    },
    {
      title: 'Status',
      dataIndex: 'statusBooking',
      key: 'statusBooking',
      render: statusBooking => (
        <>
          {statusBooking === 'Pending' && <Tag color="orange">Pending</Tag>}
        </>
      ),
    },
    {
      title: 'Booking Dates',
      dataIndex: 'bookingDates',
      key: 'bookingDates',
      render: bookingDates => (
        <>
          {bookingDates.map(date => (
            <Tag key={date._id}>{date.day}</Tag>
          ))}
        </>
      ),
    },
    {
      title: 'Slip',
      key: 'slip',
      render: (_, record) => (
        <Image src={record.slip[0]} alt="Slip" style={{ width: 50, height: 50 }} />
      ),


    },
    {
      title: 'Total Price',
      dataIndex: 'bookingTotalPrice',
      key: 'bookingTotalPrice',
    },
  ];
  const filteredData = data.filter(item =>
    item.username.includes(searchText) ||
    item.poolvillaName.includes(searchText) ||
    item.statusBooking.includes(searchText) ||
    item.bookingDates
      .map(date => date.day)
      .join(' ')
      .includes(searchText)
  );
  return (
    <div className="bgedit h-screen bg-cover">
      <Navbar />
      <div className="container mx-auto">
        
        <div className="p-10 bg-white mt-10 rounded-lg">
        <h1 className="text-center text-4xl font-semibold">Tracking</h1>
          <Search
          className="bg-white rounded-xl"
            placeholder="Search by username"
            onSearch={value => setSearchText(value)}
            style={{ width: 200, marginBottom: 20 }}
          />
          <div className="border border-gray-200 rounded-md">
            <Table
             className="bg-white rounded-sm"
              dataSource={filteredData}
              columns={columns}
              rowKey={record => record._id}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tracking
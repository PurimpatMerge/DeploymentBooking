import { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { Table, Space, Tag,Image,Input  } from 'antd';
const { Search } = Input;
const Tracking = () =>{
    const { user } = useContext(AuthContext);

    const { data, loading, error } = useFetch(`/booking/tracking/${user.username}/${user.email}`);
    const [searchText, setSearchText] = useState('');
    console.log(data);
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
              {statusBooking === 'pending' && <Tag color="orange">Pending</Tag>}
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
              <Image src={record.slip[0]} alt="Slip"   style={{ width: 50, height: 50 }}/>
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
    return(
        <div>
        <Search
        placeholder="Search by username"
        onSearch={value => setSearchText(value)}
        style={{ width: 200, marginBottom: 20 }}
      />
        <Table
       dataSource={filteredData}
        columns={columns}
        rowKey={record => record._id}
      />
      </div>
    )
}

export default Tracking
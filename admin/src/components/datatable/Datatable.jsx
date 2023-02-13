import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Image } from "antd";

import { showAlertDelete } from "../../components/alertMessage.js";
import { height } from "@mui/system";

const Datatable = ({ columns = [] }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  let fetchUrl;
  switch (path) {
    case "users":
      fetchUrl = `/${path}`;
      break;
    case "hotels":
      fetchUrl = `/${path}/admin`;
      break;
    case "booking":
      fetchUrl = `/${path}/admin`;
      break;
    default:
      fetchUrl = `/`;
  }
  const { data, loading, error } = useFetch(fetchUrl);
  console.log(data);

  useEffect(() => {
    setList(data);
  }, [data]);

  const [query, setQuery] = useState("");

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`/${path}/${id}`);
        setList(list.filter((item) => item._id !== id));
        showAlertDelete();
      } catch (err) {}
    }
  };
  const handleReject = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        await axios.put(`/${path}/reject/${id}`);
        showAlertDelete();
      } catch (err) {}
    }
  };

  const handleApprove = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to Approve booking this item?"
    );
    if (confirmDelete) {
      try {
        await axios.put(`/${path}/approve/${id}`);
        showAlertDelete();
      } catch (err) {}
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const filteredData = data.filter((item) =>
      Object.values(item)
        .join("")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setList(filteredData);
  };

  const priceColumn = [
    {
      field: "Day",
      headerName: "Day",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellPrice">
            {params.row.bookingDates.map((item) => (
              <div key={item._id}>
                {item.price} {item.day}
              </div>
            ))}
          </div>
        );
      },
    },
  ];

  const Picture = [
    {
      field: "Picture",
      headerName: "Picture",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellPrice">
            <div>
              <Image
                src={
                  params.row.slip[0]
                    ? params.row.slip[0]
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>
          </div>
        );
      },
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {path === "hotels" ? (
              <Link
                to={{
                  pathname: `/${path}/edit/${params.row._id}`,
                  state: { id: params.row._id },
                }}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">edit</div>
              </Link>
            ) : null}
            {path !== "booking" ? (
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row._id)}
              >
                Delete
              </div>
            ) : null}
          </div>
        );
      },
    },
  ];

  const Booking = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="approveReject">
              <button
                className="approveButton"
                onClick={() => handleApprove(params.row._id)}
              >
                Approve
              </button>
              <button
                className="rejectButton"
                onClick={() => handleReject(params.row._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      {!loading ? (
        <>
          <div className="datatableTitle">
            {path}
            <Link to={`/${path}/new`} className="link">
              Add New
            </Link>
          </div>
          <div>
          <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
          </div>
          <DataGrid
            className="datagrid"
            rows={list ? list : []}
            columns={columns.concat(
              data[0] && data[0].bookingDates && data[0].bookingDates.length > 0
                ? priceColumn.concat(Picture).concat(Booking)
                : actionColumn
            )}
            pageSize={9}
            rowsPerPageOptions={[9]}
            getRowId={(row) => row._id}
            rowHeight={
              data[0] && data[0].bookingDates && data[0].bookingDates.length > 0
                ? 150
                : 50
            }
          />
        </>
      ) : null}
    </div>
  );
};

Datatable.defaultProps = {
  rows: [],
};

export default Datatable;

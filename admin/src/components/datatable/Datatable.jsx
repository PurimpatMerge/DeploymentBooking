import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

import { showAlertDelete } from "../../components/alertMessage.js";

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
  const handleApprove = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to Approve booking this item?"
    );
    if (confirmDelete) {
      try {
        // showAlertDelete();
      } catch (err) {}
    }
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
              <button className="approveButton" onClick={() => handleApprove()}>
                Approve
              </button>
              <button
                className="rejectButton"
                onClick={() => handleDelete(params.row._id)}
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
          <DataGrid
            className="datagrid"
            rows={list ? list : []}
            columns={columns.concat(
              data[0] && data[0].bookingDates && data[0].bookingDates.length > 0
                ? priceColumn.concat(Booking)
                : actionColumn
            )}
            pageSize={9}
            rowsPerPageOptions={[9]}
            getRowId={(row) => row._id}
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

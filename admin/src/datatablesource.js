export const userColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "username",
    headerName: "Username",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },

  {
    field: "lineId",
    headerName: "Line",
    width: 180,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 300,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
  },
];
export const bookingColumns = [
  { field: "_id", headerName: "ID", width: 5 },
  { field: "poolvillaName", headerName: "poolvillaName", width: 150},
  { field: "username", headerName: "Username", width: 100 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "phone", headerName: "Phone", width: 100 },
  { field: "lineId", headerName: "Line ID", width: 100 },
  { 
    field: "statusBooking",
    headerName: "Status",
    width: 80,
    renderCell: (params) => (
      <div style={{ color: 
        params.value === 'Approved' ? '#228B22' : 
        params.value === 'Rejected' ? '#FF0000' :
        '#FFBF00'
      }}>
        {params.value}
      </div>
    ),
  },
  { field: "bookingTotalPrice", headerName: "Total Price", width: 100 },
];

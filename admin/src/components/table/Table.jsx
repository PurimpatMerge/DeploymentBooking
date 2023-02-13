import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useFetch from "../../hooks/useFetch";
const List = () => {
  const { data, loading, error } = useFetch(`/dashmerge/mostbook`);
  console.log(data);
  // const data = [
  //   {
  //     id: 1143155,
  //     poolvillaName: "Acer Nitro 5",
  //     photo:
  //       "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
  //     views: "1 March",
  //     count: 785,
  //   },
  // ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Top Booked ID</TableCell>
            <TableCell className="tableCell">Pool villa</TableCell>
            <TableCell className="tableCell">views</TableCell>
            <TableCell className="tableCell">count</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.photo} alt="" className="image" />
                  {row.poolvillaName}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.views}</TableCell>
              <TableCell className="tableCell">{row.count}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${"Approved"}`}>Hot</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;

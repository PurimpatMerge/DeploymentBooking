import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"

import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const List = ({columns}) => {
  return (
    <div className="list">
      <Sidebar/>
      <ReactNotifications/>
      <div className="listContainer">
        <Navbar/>
        <Datatable columns={columns}/>
      </div>
    </div>
  )
}

export default List
import {
  Routes,
  Route,
} from "react-router";
import { BrowserRouter } from 'react-router-dom';
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/login/register";
import ForgotPassword from "./pages/login/forgotPassword";
import EditProfile from "./pages/Profile/editProfile";
import Tracking from "./pages/Profile/Tracking";
import MyProfile from "./pages/Profile/myProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
        <Route path="/profile" element={<EditProfile/>}/>
        <Route path="/tracking" element={<Tracking/>}/>
        <Route path="/myProfile" element={<MyProfile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashBroad from "./pages/DashBroad";
import Login from "./pages/Login";
import SideBar from "./components/SideBar";
import Event from "./pages/Event";
import Customers from "./pages/Customers";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashbroads" element={<SideBar><DashBroad /></SideBar>} />
        <Route path="/categories" element={<SideBar><Categories /></SideBar>} />
        <Route path="/events" element={<SideBar><Event /></SideBar>} />
        <Route path="/customers" element={<SideBar><Customers /></SideBar>} />
        <Route path="/shops" element={<SideBar><Shop /></SideBar>} />
        <Route path="/products" element={<SideBar><Products /></SideBar>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

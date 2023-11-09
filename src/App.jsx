import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashBroad from "./pages/DashBroad";
import Login from "./pages/Auth/Login";
import SideBar from "./components/SideBar";
import Event from "./pages/Events/Event";
import Customers from "./pages/Customers/Customers.jsx";
import Shop from "./pages/Shops/Shop";
import Categories from "./pages/Categories/Categories";
import Products from "./pages/Products/Products.jsx";
import CustomerDetail from "./pages/Customers/CustomerDetail";
import ShopDetail from "./pages/Shops/ShopDetail.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashbroads"
          element={
            <SideBar>
              <DashBroad />
            </SideBar>
          }
        />
        <Route
          path="/categories"
          element={
            <SideBar>
              <Categories />
            </SideBar>
          }
        />
        <Route
          path="/events"
          element={
            <SideBar>
              <Event />
            </SideBar>
          }
        />
        <Route
          path="/customers"
          element={
            <SideBar>
              <Customers />
            </SideBar>
          }
        />
        <Route
          path="/shops"
          element={
            <SideBar>
              <Shop />
            </SideBar>
          }
        />
        <Route
          path="/products"
          element={
            <SideBar>
              <Products />
            </SideBar>
          }
        />
        <Route
          path="/customers/:slug"
          element={
            <SideBar>
              <CustomerDetail />
            </SideBar>
          }
        />
        <Route
          path="/shop/:slug"
          element={
            <SideBar>
              <ShopDetail />
            </SideBar>
          }
        />
        <Route
          path="/products/:slug"
          element={
            <SideBar>
              <ShopDetail />
            </SideBar>
          }
        />
        <Route
          path="/events/:slug"
          element={
            <SideBar>
              <ShopDetail />
            </SideBar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

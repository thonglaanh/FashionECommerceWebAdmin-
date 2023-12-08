import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashBroad from "./pages/DashBroad";
import Login from "./pages/Auth/Login";
import SideBar from "./components/SideBar";
import Event from "./pages/Events/Event";
import Customers from "./pages/Customers/Customers.jsx";
import Shop from "./pages/Shops/Shop";
import Categories from "./pages/Categories/Categories";
import Products from "./pages/Products/Products.jsx";
import ProductDetail from "./pages/Products/ProductDetail.jsx";
import OrderScreen from "./pages/Orders/OderScreen.jsx";
import { useEffect } from "react";
import Private from "./components/private/index.jsx";
import ShopDetail from "./pages/Shops/ShopDetail.jsx";
import OrderDetail from "./pages/Orders/OrderDetail.jsx";
import CustomerDetail from "./pages/Customers/CustomerDetail.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashbroads"
          element={
            <Private>
              <SideBar>
                <DashBroad />{" "}
              </SideBar>
            </Private>
          }
        />
        <Route
          path="/categories"
          element={
            <Private>
              <SideBar>
                <Categories />{" "}
              </SideBar>
            </Private>
          }
        />
        <Route
          path="/discounts"
          element={
            <Private>
              <SideBar>
                <Event />
              </SideBar>
            </Private>
          }
        />
        <Route
          path="/customers"
          element={
            <Private>
              <SideBar>
                <Customers />
              </SideBar>
            </Private>
          }
        />
        <Route
          path="/customers/:slug"
          element={
            <Private>
              <SideBar>
                <CustomerDetail />
              </SideBar>
            </Private>
          }
        />
        <Route
          path="/shops"
          element={
            <Private>
              <SideBar>
                <Shop />
              </SideBar>
            </Private>
          }
        />
        <Route
          path="/shops/:slug"
          element={
            <Private>
              <SideBar>
                <ShopDetail />
              </SideBar>
            </Private>
          }
        />
        <Route
          path="/order"
          element={
            <Private>
              <SideBar>
                <OrderScreen />
              </SideBar>
            </Private>
          }
        />
        <Route
          path="/order/:slug"
          element={
            <Private>
              <SideBar>
                <OrderDetail />
              </SideBar>
            </Private>
          }
        />
        <Route
          path="/products"
          element={
            <Private>
              <SideBar>
                <Products />
              </SideBar>
            </Private>
          }
        />

        <Route
          path="/products/:slug"
          element={
            <Private>
              <SideBar>
                <ProductDetail />
              </SideBar>
            </Private>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

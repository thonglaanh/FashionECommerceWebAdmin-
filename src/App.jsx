import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
function App() {
  return (
    <Router>
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
          path="/discounts"
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
          path="/order"
          element={
            <SideBar>
              <OrderScreen />
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
          path="/products/:slug"
          element={
            <SideBar>
              <ProductDetail />
            </SideBar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

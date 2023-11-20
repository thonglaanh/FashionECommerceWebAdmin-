import React from "react";
import "../styles/SideBar.css";
import { useNavigate, NavLink } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
import config from "../config";
import { ToastContainer, toast } from "react-toastify";
const SideBar = ({ children }) => {
  const [account, setAccount] = useState({});
  const navigate = useNavigate();
  const menuItem = [
    {
      path: "/dashbroads",
      name: "Thống kê",
      icon: "assets/dashboard.png",
    },
    {
      path: "/categories",
      name: "Danh mục",
      icon: "assets/categories.png",
    },
    {
      path: "/products",
      name: "Sản phẩm",
      icon: "assets/skin-care.png",
    },
    {
      path: "/shops",
      name: "Shop",
      icon: "assets/shop.png",
    },
    {
      path: "/customers",
      name: "Khách hàng",
      icon: "assets/group.png",
    },
    {
      path: "/discounts",
      name: "Giảm giá",
      icon: "assets/coupon.png",
    },
    {
      path: "/order",
      name: "Đơn hàng",
      icon: "assets/order-delivery.png",
    },
  ];
  const handlerLogout = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("accessToken");
      console.log(userId);
      console.log(accessToken);
      axios
        .delete(
          config.API_IP + "/access/signOut",

          {
            headers: {
              "x-xclient-id": userId,
              authorization: accessToken,
            },
          }
        )
        .then((res) => {
          console.log(res);
          localStorage.removeItem("userId");
          localStorage.removeItem("accessToken");
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main-container-sidebar">
      <div className="sidebar-container">
        <img className="sidebar-logo" src={require("../assets/logo.png")} />
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="sidebar-item"
            activeclassName="active"
          >
            <div className="sidebar-icon">
              <img src={require(`../${item.icon}`)} alt={item.name} />
            </div>
            <div className="sidebar-label">{item.name}</div>
          </NavLink>
        ))}
        <div className="sidebar-account">
          <img
            className="avatar"
            src="https://inanh.net/wp-content/uploads/2020/07/in_anh_the_2.jpg"
          />
          <div>
            <p className="sidebar-account-name">Nguyễn Văn A</p>
            <p className="sidebar-account-email">Admin1</p>
          </div>
          <img
            src={require("../assets/exit.png")}
            className="icon__logout"
            onClick={() => handlerLogout()}
          />
        </div>
      </div>
      <ToastContainer />
      <main>{children}</main>
    </div>
  );
};

export default SideBar;

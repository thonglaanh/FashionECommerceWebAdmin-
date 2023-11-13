import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/SideBar.css";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
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
      path: "/events",
      name: "Sự kiện",
      icon: "assets/party.png",
    },
  ];
  const handlerLogout = () => {
    localStorage.removeItem("account");
    localStorage.removeItem("token");
    navigate("/");
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
      <main>{children}</main>
    </div>
  );
};

export default SideBar;

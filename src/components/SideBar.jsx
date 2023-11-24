import React from "react";
import "../styles/SideBar.css";
import { useNavigate, NavLink } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
import config from "../config";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "antd";
import { Layout } from "antd";

const { Footer } = Layout;
const SideBar = ({ children }) => {
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
      name: "Cửa hàng",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    handlerLogout();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
        <Modal
          title="Log out"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ style: { background: "red", borderColor: "red" } }}
        >
          <p>Bạn có chắc chắn muốn đăng xuất không ?</p>
        </Modal>
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
            onClick={() => showModal()}
          />
        </div>
      </div>
      <ToastContainer />
      <div style={{ flexDirection: "column" }}>
        <main>{children}</main>
        <Footer
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          TrustyBuy Admin ©2023 Created by Nguyen Huu Thong
        </Footer>
      </div>
    </div>
  );
};

export default SideBar;

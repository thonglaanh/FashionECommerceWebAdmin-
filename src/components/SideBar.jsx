import React, { useState } from "react";
import { Layout, Modal } from "antd";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import config from "../config";
import "../styles/SideBar.css";

const { Header, Footer } = Layout;

const SideBar = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
  const activeItem = menuItem.find((item) => item.path === location.pathname);
  const pageTitle = activeItem ? activeItem.name : "Chi tiết";
  return (
    <div className="main-container-sidebar">
      <div className="sidebar-container">
        <Modal
          title="Đăng xuất"
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
      </div>
      <div style={{ flexDirection: "column" }}>
        <Header
          style={{
            width: "100%",
            display: "flex",
            height: "70px",
            zIndex: 1,
            backgroundColor: "white",
            justifyContent: "space-between",
            alignItems: "center",
            // position: "fixed",
            // left: "0",
            // right: "0",
          }}
        >
          <p
            style={{
              color: "black",
              fontSize: "28px",
              padding: "0px",
              margin: "0px",
            }}
          >
            {pageTitle}
          </p>
          <div
            style={{
              display: "flex",
              zIndex: 1,
              justifyContent: "right",
              alignItems: "center",
            }}
          >
            <img
              className="avatar"
              src={require("../assets/Avatar.jpg")}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "50%",
                marginRight: "15px",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p
                style={{
                  margin: "0px",
                  color: "#777777",
                  height: "20px",
                  fontSize: "12px",
                }}
              >
                Admin
              </p>
              <p
                style={{
                  margin: "0px",
                  color: "black",
                  height: "65px",
                  fontSize: "13px",
                }}
              >
                Nguyễn Hữu Thông
              </p>
            </div>
            <img
              src={require("../assets/logout.png")}
              onClick={() => showModal()}
              style={{ width: "35px", height: "35px", marginLeft: "20px" }}
            />
          </div>
        </Header>
        <main>{children}</main>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          TrustyBuy Admin ©2023 Created by Group 5
        </Footer>
      </div>
    </div>
  );
};

export default SideBar;

import React, { useEffect, useState } from "react";
import "../../styles/Detail.css";
import { useLocation } from "react-router-dom";
import { message, Modal } from "antd";
import axios from "axios";
import config from "../../config";
import DataTable from "react-data-table-component";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import moment from "moment";

const OrderDetail = () => {
  const location = useLocation();
  const order = location.state.row;
  const [orders, setorders] = useState();
  const [response, setResponse] = useState(null);

  const fetchStatistical = async () => {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");

    console.log(userId);
    console.log(accessToken);
    await axios
      .get(config.API_IP + `/admin/tradingHistory/${order._id}`, {
        headers: {
          "x-xclient-id": userId,
          authorization: accessToken,
        },
      })
      .then((res) => {
        setResponse(res);
        setorders(res.data.message.getTradeing[0]);
        console.log(res.data.message.getTradeing[0].productInfo[0]);
        console.log(res);
      });
  };
  useEffect(() => {
    fetchStatistical();
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "orange";
      case "confirmed":
        return "cyan";
      case "shipped":
        return "blue";
      case "cancelled":
        return "red";
      case "delivered":
        return "green";
      default:
        return "black";
    }
  };
  const columns = [
    { name: "ID", selector: (row, index) => `#${index + 1}` },
    {
      name: "Ảnh",
      selector: (row) => (
        <img className="row-image" src={`uploads/${row.product_thumb[0]}`} />
      ),
    },
    {
      name: "Tên sản phẩm",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Giá sản phẩm",
      selector: (row) =>
        row.product_price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),

      sortable: true,
    },
  ];
  const customHeader = {
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        backgroundColor: "#e0e0e0",
        border: "1px solid #ddd",
      },
    },

    cells: {
      style: {
        border: "1px solid #ddd",
      },
    },
  };
  return (
    <div>
      {response ? (
        <div
          style={{
            height: "100vh",
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
          }}
        >
          <div>
            <div className="box">
              <p>TỔNG QUAN</p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0px",
                }}
              >
                <div>
                  <div>
                    Mã theo dõi đơn hàng : {orders.order_trackingNumber}
                  </div>
                  <div>
                    Đơn hàng :{" "}
                    <label
                      style={{ textTransform: "uppercase", color: "#0099ff" }}
                    >
                      {orders._id}
                    </label>
                  </div>

                  <div>
                    Thời gian đặt hàng :{" "}
                    {moment(orders.createdAt).format("HH:mm:ss DD/MM/YYYY")}
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: statusColor(orders.order_status),
                    color: "#fff",
                    height: "55px",
                    borderRadius: "10px",
                    margin: "20px",
                  }}
                >
                  Trạng thái đơn hàng : {orders.order_status}
                </div>
              </div>
            </div>
            <div
              style={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <div className="box">
                <p>CỬA HÀNG</p>
                <div>
                  <label
                    style={{
                      fontWeight: "500",
                      fontSize: "15px",
                      textTransform: "uppercase",
                      width: "100%",
                    }}
                  >
                    {orders.shopInOrder[0].user_name}
                  </label>
                  Thông tin liên hệ: {orders.shopInOrder[0].email}
                </div>
              </div>
              <div className="box">
                <p>KHÁCH HÀNG </p>
                <div>
                  {" "}
                  <label
                    style={{
                      fontWeight: "500",
                      fontSize: "15px",
                      textTransform: "uppercase",
                      width: "100%",
                    }}
                  >
                    {orders.order_userId[0].fullName}
                  </label>
                  <label
                    style={{
                      width: "100%",
                    }}
                  >
                    Số điện thoại: 0{orders.order_userId[0].phoneNumber}
                  </label>
                  Địa chỉ nhận hàng: {orders.order_shipping.City}
                </div>
              </div>
            </div>
            <div style={{ margin: "10px" }}>
              <DataTable
                columns={columns}
                data={orders.productInfo[0]}
                highlightOnHover
                customStyles={customHeader}
              />
            </div>
          </div>
          <div className="box pay">
            <p>THANH TOÁN </p>
            <div>Phương thức thanh toán : VN PAY</div>
            <div>
              Giá tiền :{" "}
              <label htmlFor="" style={{ color: "red" }}>
                {" "}
                {orders.order_checkout.totalCheckout.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </label>
            </div>
            <div>
              Giảm giá :{" "}
              <label
                htmlFor=""
                style={{
                  color: "#00e600",
                }}
              >
                {orders.order_checkout.totalCheckout.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </label>
            </div>
            <div>
              Phí vận chuyển :{" "}
              <label htmlFor="" style={{ color: "red" }}>
                {orders.order_checkout.feeShip.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </label>
            </div>
            <div style={{ marginTop: "10px", borderTop: "1px solid #e0e0e0" }}>
              TỔNG :{" "}
              <label
                htmlFor=""
                style={{ color: "orange", fontWeight: "500", fontSize: "20px" }}
              >
                {orders.order_checkout.totalCheckout.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 30,
                }}
                spin
              />
            }
          />
        </div>
      )}
    </div>
  );
};

export default OrderDetail;

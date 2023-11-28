import React, { useEffect, useState } from "react";
import "../../styles/Detail.css";
import { useLocation } from "react-router-dom";
import { message, Modal } from "antd";
import axios from "axios";
import config from "../../config";
import DataTable from "react-data-table-component";

const OrderDetail = () => {
  const location = useLocation();
  const shop = location.state.row;
  const [statistical, setStatistical] = useState([]);

  const fetchStatistical = async () => {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
    console.log(userId);
    console.log(accessToken);
    await axios
      .get(config.API_IP + `/admin/statisticalShop/${shop._id}`, {
        headers: {
          "x-xclient-id": userId,
          authorization: accessToken,
        },
      })
      .then((res) => {
        setStatistical(res.data.message.topProductSold);
        console.log(res);
      });
  };
  useEffect(() => {
    fetchStatistical();
  }, []);

  const columns = [
    {
      name: "Ảnh",
      selector: (row) => (
        <img className="row-image" src={`uploads/${row.product_thumb[0]}`} />
      ),
    },
    {
      name: "Tên",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Giá",
      selector: (row) =>
        row.product_price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
      sortable: true,
    },
    {
      name: "Đã bán",
      selector: (row) => row.product_sold,
      sortable: true,
    },
    {
      name: "Đánh giá",
      selector: (row) => (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p>{row.product_ratingAverage}</p>
          <img
            src={require("../../assets/star.png")}
            style={{ width: "20px", height: "20px", marginLeft: "7px" }}
          />
        </div>
      ),
      sortable: true,
    },
  ];

  console.log(shop);
  return (
    <div>
      <div className="detail_container">
        <div className="detail_container_image">
          <img className="detail_image" src={`/${shop.avatarShop}`} />
        </div>
        <div className="detail_content">
          <div className="detail_content_customer">
            <p className="detail_title">Thông tin sản phẩm : </p>
            <div>
              <img src={require("../../assets/shop.png")} />
              <p>Cửa hàng : </p>
              <div className="detail_gender">{shop.nameShop}</div>
            </div>

            <div>
              <img src={require("../../assets/gmail.png")} />
              <p>Email cửa hàng : </p>
              <div className="detail_phone">{shop.emailShop}</div>
            </div>
            <div>
              <img src={require("../../assets/placeholder.png")} />
              <p>Địa chỉ : </p>
              <div className="detail_phone">{shop.address}</div>
            </div>
            <div>
              <img src={require("../../assets/phone-call.png")} />
              <p>Số điện thoại : </p>
              <div className="detail_gender">0{shop.phoneNumberShop}</div>
            </div>

            <div>
              <img src={require("../../assets/three.png")} />
              <p>Chi tiết : </p>
              <div className="detail_gender">{shop.des}</div>
            </div>
          </div>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={statistical}
        responsive
        paginationPerPage={5}
        highlightOnHover
      />
    </div>
  );
};

export default OrderDetail;

import React, { useEffect, useState } from "react";
import "../../styles/Detail.css";
import { useLocation } from "react-router-dom";
import { Tabs, Modal, Button, message } from "antd";
import axios from "axios";
import config from "../../config";
import DataTable from "react-data-table-component";
import { Chart } from "react-google-charts";
const { TabPane } = Tabs;

const ShopDetail = () => {
  const location = useLocation();
  const shop = location.state.row;
  const [statistical, setStatistical] = useState([]);

  const [month, setMonth] = useState([]);

  const options = {
    title: "Thống kê doanh thu cửa hàng",
    hAxis: {
      title: "Hàng tháng ",
      titleTextStyle: { color: "#333" },
    },
    vAxis: { minValue: 0 },
    chartArea: { width: "80%", height: "70%" },
  };
  //

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
        const doanhThu = res.data.message.revenue;
        const monthData = doanhThu.map((item) => [
          item.month,
          item.totalRevenue,
        ]);
        setMonth([["Tháng", "Doanh thu"], ...monthData]);

        console.log(res);
      });
  };
  useEffect(() => {
    fetchStatistical();
  }, []);

  const columns = [
    {
      name: "Index",
      selector: (row, index) => `#${index + 1}`,
    },
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
  const customHeader = {
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        backgroundColor: "#e0e0e0",
      },
    },
    cells: {
      style: {
        border: "1px solid #ddd",
      },
    },
  };

  console.log(shop);
  return (
    <div style={{ paddingTop: "30px", height: "100vh" }}>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Chi tiết cửa hàng" key="1">
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
        </TabPane>
        <TabPane tab="Doanh thu" key="2">
          <Chart
            chartType="AreaChart"
            width="100%"
            height="400px"
            data={month}
            options={options}
          />
        </TabPane>
        <TabPane tab="Danh sách sản phẩm" key="3">
          <DataTable
            columns={columns}
            data={statistical}
            responsive
            paginationPerPage={5}
            highlightOnHover
            customStyles={customHeader}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ShopDetail;

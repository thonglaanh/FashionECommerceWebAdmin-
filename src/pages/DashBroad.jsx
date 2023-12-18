import React, { useEffect, useState } from "react";
import "../styles/DashBroad.css";
import axios from "axios";
import config from "../config";
import DataTable, { Direction } from "react-data-table-component";
import { Chart } from "react-google-charts";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

const DashBroad = () => {
  const [customer, setCustomers] = useState();
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();
  const [store, setStore] = useState();
  const [bill, setBill] = useState();
  const [discount, setDiscount] = useState();
  const [chartData, setChartData] = useState([]);

  const [year, setYear] = useState(2023);
  const [products, setProducts] = useState([]);
  const [orderByMonth, setOrderByMonth] = useState({});

  //
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(config.API_IP + "/admin/statistical", {
          headers: {
            "x-xclient-id": userId,
            authorization: accessToken,
          },
        });
        console.log(userId);
        console.log(accessToken);
        setResponse(response);
        setBill(response.data.message.countOrders);
        setCategory(response.data.message.countCategory);
        setCustomers(response.data.message.countUsers);
        setStore(response.data.message.countShops);
        setProduct(response.data.message.countProducts);
        setDiscount(response.data.message.countDiscount);
        //
        setProducts(response.data.message.topProductSold);

        console.log(response);
        const data = [
          ["Element", "Density", { role: "style" }],
          [
            "Danh mục",
            response.data.message.mergedData[year].ordertCount,
            "green",
          ],
          [
            "Sản phẩm",
            response.data.message.mergedData[year].productCount,
            "red",
          ],
          [
            "Cửa hàng",
            response.data.message.mergedData[year].shopCount,
            "gold",
          ],
          [
            "Khách hàng",
            response.data.message.mergedData[year].userCount,
            "color: purple",
          ],
          [
            "Hóa đơn",
            response.data.message.mergedData[year].orderCount,
            "color: blue",
          ],
          [
            "Mã giảm giá",
            response.data.message.mergedData[year].discountCount,
            "color: orange",
          ],
        ];
        setChartData(data);
        //

        const rawData = {
          "Chưa xác nhận": response.data.message.orderPendingByMonth,
          "Đã xác nhận": response.data.message.orderConfirmedByMonth,
          "Đang giao": response.data.message.orderShippedByMonth,
          "Đã nhận": response.data.message.orderDeliveredByMonth,
          "Đã hủy": response.data.message.orderCancelledByMonth,
        };
        const header = ["Tháng"];
        const months = Array.from({ length: 12 }, (_, i) => i + 1);
        for (const key in rawData) {
          if (rawData.hasOwnProperty(key)) {
            header.push(key);
          }
        }
        const result = [header];
        months.forEach((month) => {
          const row = [month];
          for (const key in rawData) {
            if (rawData.hasOwnProperty(key)) {
              const dataForMonth = rawData[key].find(
                (item) => item._id === month
              );
              row.push(dataForMonth ? dataForMonth.totalOrders : 0);
            }
          }

          result.push(row);
        });
        setOrderByMonth(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [year]);
  const itemStatistical = [
    {
      background: "#FFCC99",
      icon: "assets/people.png",
      title: "Người dùng",
      statistical: customer,
    },
    {
      background: "#99FF33",
      icon: "assets/category (2).png",
      title: "Danh mục",
      statistical: category,
    },
    {
      background: "#97FFFF",
      icon: "assets/products.png",
      title: "Sản phẩm",
      statistical: product,
    },
    {
      background: "#EE82EE",
      icon: "assets/storecolor.png",
      title: "Cửa hàng",
      statistical: store,
    },
    {
      background: "#D2B48C",
      icon: "assets/bill.png",
      title: "Đơn hàng",
      statistical: bill,
    },
    {
      background: "#F3DDB3",
      icon: "assets/discount.png",
      title: "Giảm giá",
      statistical: discount,
    },
  ];

  const columns = [
    {
      name: "Ảnh",
      selector: (row) => (
        <img className="row-image" src={`uploads/${row?.product_thumb[0]}`} />
      ),
    },
    {
      name: "Tên",
      selector: (row) => row?.product_name,
      sortable: true,
    },
    {
      name: "Giá",
      selector: (row) =>
        row?.product_price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
      sortable: true,
    },
    {
      name: "Đã bán",
      selector: (row) => row?.product_sold,
      sortable: true,
    },
    {
      name: "Đánh giá",
      selector: (row) => (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p>{row.product_ratingAverage}</p>
          <img
            src={require("../assets/star.png")}
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
        borderBottom: "1px solid #777777",
      },
    },
    cells: {
      style: {
        border: "1px solid #777777",
        borderTop: "none",
      },
    },
  };

  const options = {
    chart: {
      title: "Thống kê hóa đơn theo tháng",
    },
  };

  return (
    <div>
      {response ? (
        <div>
          <div className="statistical" style={{ marginTop: "10px" }}>
            <p className="title-block">Tổng quan</p>
            <div className="item-statistical">
              {itemStatistical.map((item, index) => (
                <div
                  className="contaner-statistical"
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div
                    className="statistical-icon"
                    style={{ backgroundColor: `${item.background}` }}
                  >
                    <img src={require(`../${item.icon}`)} alt={item.name} />
                  </div>
                  <div>
                    <div className="statistical-number">{item.statistical}</div>
                    <div className="statistical-title">{item.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="dashbroad-content">
            <div className="top-selling">
              <p className="title-dashbroad" style={{ marginBottom: "20px" }}>
                Top 5 sản phẩm bán chạy
              </p>
              <DataTable
                columns={columns}
                className="my-box"
                data={products}
                responsive
                highlightOnHover
                customStyles={customHeader}
              />
            </div>

            <div className="bar-chart">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p className="title-dashbroad">Thống kê từng năm</p>
                <select
                  onChange={(e) => {
                    setYear(e.target.value);
                    console.log(e.target.value);
                  }}
                  className="filter-dropdown-select"
                >
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>
              <Chart
                chartType="ColumnChart"
                style={{
                  border: "1px solid #ddd",
                  width: "100%",
                  height: "412px",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}
                data={chartData}
              ></Chart>
            </div>
          </div>
          <div
            style={{ padding: "20px 10px", width: "98%", borderRadius: "8px" }}
          >
            <Chart
              chartType="Line"
              style={{
                border: "1px solid #ddd",
                width: "100%",
                height: "400px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
              data={orderByMonth}
              options={options}
            />
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

export default DashBroad;

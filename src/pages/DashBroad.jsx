import React, { useEffect, useState } from "react";
import "../styles/DashBroad.css";
import axios from "axios";
import config from "../config";
import DataTable from "react-data-table-component";
import { Chart } from "react-google-charts";
const DashBroad = () => {
  const [customer, setCustomers] = useState();
  const [category, setCategory] = useState();
  const [product, setProduct] = useState();
  const [store, setStore] = useState();
  const [bill, setBill] = useState();
  const [chartData, setChartData] = useState([]);

  const [year, setYear] = useState(2023);
  const [products, setProducts] = useState([]);

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
        setBill(response.data.message.countOrders);
        setCategory(response.data.message.countCategory);
        setCustomers(response.data.message.countUsers);
        setStore(response.data.message.countShops);
        setProduct(response.data.message.countProducts);
        //
        setProducts(response.data.message.topProductSold);

        console.log(response);
        const data = [
          ["Element", "Density", { role: "style" }],
          [
            "Đơn hàng",
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
        ];
        setChartData(data);
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
      title: "Customers",
      statistical: customer,
    },
    {
      background: "#99FF33",
      icon: "assets/category (2).png",
      title: "Category",
      statistical: category,
    },
    {
      background: "#97FFFF",
      icon: "assets/products.png",
      title: "Products",
      statistical: product,
    },
    {
      background: "#EE82EE",
      icon: "assets/storecolor.png",
      title: "Stores",
      statistical: store,
    },
    {
      background: "#D2B48C",
      icon: "assets/bill.png",
      title: "Bills",
      statistical: bill,
    },
  ];

  const columns = [
    {
      name: "Ảnh",
      selector: (row) => (
        <img className="row-image" src={row.productInfo[0].product_thumb[0]} />
      ),
    },
    {
      name: "Tên sản phẩm",
      selector: (row) => row.productInfo[0].product_name,
      sortable: true,
    },
    {
      name: "Giá",
      selector: (row) =>
        row.productInfo[0].product_price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
      sortable: true,
    },
    {
      name: "Số lượng",
      selector: (row) => row.productInfo[0].product_quantity,
      sortable: true,
    },
    {
      name: "Đánh giá",
      selector: (row) => row.productInfo[0].product_ratingAverage,
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
  };

  return (
    <div>
      <p className="title-home">Trang chủ</p>
      <div className="statistical">
        <p className="title-block">Statistical</p>
        <div className="item-statistical">
          {itemStatistical.map((item, index) => (
            <div className="contaner-statistical">
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
          <p className="title-dashbroad" style={{ marginBottom: "25px" }}>
            Top bán chạy
          </p>
          <DataTable
            columns={columns}
            data={products}
            responsive
            paginationPerPage={5}
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
            <p className="title-dashbroad">Thống kê</p>
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
            width="100%"
            height="400px"
            data={chartData}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBroad;

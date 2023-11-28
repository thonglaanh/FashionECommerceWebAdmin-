import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import DataTable from "react-data-table-component";
import "../../styles/Row.css";
import "../../styles/Modal.css";
import { Modal } from "antd";
import moment from "moment/moment";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const OrderScreen = () => {
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orders, setOrder] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("accessToken");
      axios
        .get(config.API_IP + "/admin/order", {
          headers: {
            "x-xclient-id": userId,
            authorization: accessToken,
          },
        })
        .then((res) => {
          console.log(res.data.message);
          setOrder(res.data.message);
        });
    };
    fetchData();
  }, []);

  //
  const selectedData = (row) => {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(config.API_IP + "/admin/tradingHistory/" + row._id, {
        headers: {
          "x-xclient-id": userId,
          authorization: accessToken,
        },
      })
      .then((res) => {
        console.log(res.data.message);
      });
  };
  //
  const columns = [
    { name: "ID", selector: (row, index) => `#${index + 1}` },

    {
      name: "Email khách hàng",
      selector: (row) => row.order_userId.email,
      sortable: true,
    },
    {
      name: "Tên cửa hàng",
      selector: (row) => row.order_products[0].shopId,
      sortable: true,
    },
    {
      name: "Địa chỉ",
      selector: (row) => row.order_shipping.City,
      sortable: true,
    },
    {
      name: "Trạng thái",
      selector: (row) => row.order_status,
    },
    {
      name: "Action",
      selector: (row) => (
        <Link to={`/order/${row._id}`} state={{ row }}>
          View detail
        </Link>
      ),
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
    rows: {
      style: {
        border: "1px solid #ddd",
      },
    },
    cells: {
      style: {
        border: "1px solid #ddd",
      },
    },
  };
  useEffect(() => {
    const result = orders.filter((item) => {
      return search.length !== 0
        ? item.order_userId.user_name
            .toUpperCase()
            .includes(search.toUpperCase())
        : true;
    });
    setFilteredOrders(result);
  }, [search, orders]);
  return (
    <div className="selling">
      <p className="title_page" style={{ marginBottom: "10px" }}>
        Order
      </p>
      <DataTable
        columns={columns}
        data={filteredOrders}
        pagination
        responsive
        paginationPerPage={6}
        highlightOnHover
        customStyles={customHeader}
        striped
        subHeader
        subHeaderComponent={
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",

              alignItems: "center",
            }}
          >
            <div
              style={{ position: "relative", flex: "1", marginLeft: "10px" }}
            >
              <input
                type="text"
                className="search-input"
                form-control
                placeholder="Nhập từ khóa tìm kiếm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <SearchOutlined
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "20px",
                  color: "black",
                }}
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default OrderScreen;

import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import DataTable from "react-data-table-component";
import "../../styles/Row.css";
import "../../styles/Modal.css";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

const OrderScreen = () => {
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orders, setOrder] = useState([]);
  const [response, setResponse] = useState(null);
  const [selected, setSelected] = useState("");
  const status = [
    {
      vie: "Chưa xác nhận",
      eng: "pending",
    },
    { vie: "Xác nhận", eng: "confirmed" },
    { vie: "Đang giao", eng: "shipped" },
    { vie: "Đã hủy", eng: "cancelled" },
    { vie: "Đã nhận", eng: "delivered" },
  ];
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
          setResponse(res);
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
  const statusText = (status) => {
    switch (status) {
      case "pending":
        return "Chưa xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "shipped":
        return "Đang giao";
      case "cancelled":
        return "Đã hủy";
      case "delivered":
        return "Đã nhận";
      default:
        return "Không xác định";
    }
  };
  //
  const columns = [
    { name: "ID", selector: (row, index) => `#${index + 1}` },

    {
      name: "SDT khách hàng",
      selector: (row) => `0${row.order_userId[0]?.phoneNumber}`,
      sortable: true,
    },
    {
      name: "Tên cửa hàng",
      selector: (row) => row.order_products[0]?.shopId?.nameShop,
      sortable: true,
    },
    {
      name: "Sản phẩm",
      selector: (row) => row.item_products[0]?.productId?.product_name,
      sortable: true,
    },
    ,
    {
      name: "Tổng tiền",
      selector: (row) =>
        row?.item_products[0]?.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
      sortable: true,
    },
    {
      name: "Trạng thái",
      selector: (row) => (
        <p style={{ color: statusColor(row.order_status) }}>
          {statusText(row.order_status)}
        </p>
      ),
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
      const matchesSearch =
        search.length !== 0
          ? item.order_userId.user_name
              .toUpperCase()
              .includes(search.toUpperCase())
          : true;
      const matchesStatus =
        selected.length !== 0 ? item.order_status === selected : true;
      return matchesSearch && matchesStatus;
    });

    setFilteredOrders(result);
  }, [search, selected, orders]);

  return (
    <div>
      {response ? (
        <div className="selling">
          <DataTable
            columns={columns}
            data={filteredOrders}
            pagination
            responsive
            paginationPerPage={10}
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
                  style={{
                    position: "relative",
                    flex: "1",
                    marginLeft: "10px",
                  }}
                >
                  <select
                    value={selected}
                    className="filter-dropdown-select"
                    style={{ marginRight: "30px" }}
                    onChange={(e) => setSelected(e.target.value)}
                  >
                    <option value="">Tất cả</option>
                    {status.map((st) => (
                      <option key={st.eng} value={st.eng}>
                        {st.vie}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            }
          />
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

export default OrderScreen;

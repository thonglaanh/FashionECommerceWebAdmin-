import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import DataTable from "react-data-table-component";
import "../../styles/Row.css";
import "../../styles/Modal.css";
import { Modal } from "antd";
import moment from "moment/moment";

const OrderScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
  const columns = [
    { name: "ID", selector: (row, index) => `#${index + 1}` },

    {
      name: "Tên khách hàng",
      selector: (row) => row.order_userId.user_name,
      sortable: true,
    },
    {
      name: "Tên cửa hàng",
      selector: (row) => row.order_userId.user_name,
      sortable: true,
    },
    {
      name: "Số sản phẩm",
      selector: (row) => row.order_userId.user_name,
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
        <a
          onClick={() => {
            setIsModalOpen(true);

            setSelected(row);
          }}
          style={{ color: "blue", cursor: "pointer" }}
        >
          View detail
        </a>
      ),
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
    <div className="selling">
      <p className="title_page" style={{ marginBottom: "10px" }}>
        Order
      </p>
      <Modal
        title="Thông tin đơn hàng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ textAlign: "center" }}
        bodyStyle={{ textAlign: "left", marginTop: "20px" }}
      >
        {isModalOpen == true ? (
          <div>
            <p>Khách hàng : {selected.order_userId.email}</p>
            <p>Cửa hàng : {selected.order_userId.email}</p>
            <p>
              Sản phẩm :{" + "}
              {selected.order_products
                .map((product) => product.shopId)
                .join("   \n+")}
            </p>
            <p>Địa chỉ nhận hàng : {selected.order_shipping.City}</p>
            <p>
              Tổng giá đơn hàng :{" "}
              {selected.order_checkout.totalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>

            <p>
              Thời gian đặt hàng :{" "}
              {moment(selected.createdAt).format("HH:mm:ss DD/MM/YYYY")}
            </p>
            <p>Trạng thái : {selected.order_status}</p>
          </div>
        ) : (
          <div></div>
        )}
      </Modal>

      <DataTable
        columns={columns}
        data={orders}
        pagination
        responsive
        paginationPerPage={7}
        highlightOnHover
        customStyles={customHeader}
        striped
      />
    </div>
  );
};

export default OrderScreen;

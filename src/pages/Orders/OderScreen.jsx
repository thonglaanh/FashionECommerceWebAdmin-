import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { Link } from "react-router-dom";
import slug from "slugifi";
import DataTable from "react-data-table-component";
import "../../styles/Row.css";

const convertToSlug = (text) => {
  return slug(text, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  });
};

const OrderScreen = () => {
  const [openModal, setOpenModal] = useState(false);
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
    { name: "ID", sortable: true, selector: (row, index) => `#${index + 1}` },

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
      sortable: true,
    },
  ];
  return (
    <div className="selling">
      <p className="title-product">Event</p>
      <button class="add-button" onClick={() => setOpenModal(!openModal)}>
        Thêm dữ liệu
      </button>

      <DataTable columns={columns} data={orders} pagination responsive />
    </div>
  );
};

export default OrderScreen;

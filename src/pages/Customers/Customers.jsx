import React, { useEffect, useState } from "react";
import CustomerAdd from "./CustomerAdd";
import axios from "axios";
import config from "../../config";
import DataTable from "react-data-table-component";
import "../../styles/Row.css";

const Customers = () => {
  const [openModal, setOpenModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("accessToken");
      console.log(userId);
      console.log(accessToken);
      axios
        .get(config.API_IP + "/admin/user", {
          headers: {
            "x-xclient-id": userId,
            authorization: accessToken,
          },
        })
        .then((res) => {
          setCustomers(res.data.message);
          console.log(res.data.message);
        });
    };
    fetchData();
  }, []);
  const columns = [
    { name: "ID", sortable: true, selector: (row, index) => `#${index + 1}` },
    {
      name: "Ảnh",
      selector: (row) => (
        <img
          className="row-image"
          src={
            row.information
              ? row.information.avatar
                ? `${row.information.avatar}`
                : "Chưa có"
              : "Chưa có"
          }
        />
      ),
      sortable: true,
    },
    {
      name: "Tên khách hàng",
      selector: (row) => row.user_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Địa chỉ",
      selector: (row) => (
        <p>
          {row.information
            ? row.information.address
              ? row.information.address
              : "Chưa có"
            : "Chưa có"}
        </p>
      ),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button className="row-action-button">Update</button>
        </div>
      ),
      sortable: true,
    },
  ];
  return (
    <div className="selling">
      {openModal && (
        <CustomerAdd openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <p className="title-product">Customers</p>
      <button class="add-button" onClick={() => setOpenModal(!openModal)}>
        Thêm dữ liệu
      </button>

      <DataTable columns={columns} data={customers} pagination responsive />
    </div>
  );
};

export default Customers;

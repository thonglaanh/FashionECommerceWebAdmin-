import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Modal } from "antd";
import "../../styles/Row.css";
import config from "../../config";
import { SearchOutlined } from "@ant-design/icons";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [filteredCustomer, setFilteredCustomer] = useState([]);
  const [search, setSearch] = useState("");
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(config.API_IP + "/admin/user", {
          headers: {
            "x-xclient-id": userId,
            authorization: accessToken,
          },
        });
        setCustomers(response.data.message);
        console.log(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { name: "ID", selector: (row, index) => `#${index + 1}` },
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
      name: "Giới tính",
      selector: (row) =>
        row.information
          ? row.information.gender
            ? `${row.information.gender}`
            : "Chưa có"
          : "Chưa có",
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
        <a
          className="view-detail"
          onClick={() => {
            setIsModalOpen(true);
            setSelected(row);
          }}
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
    rows: {
      style: {
        borderBottom: "1px solid #ddd",
      },
    },
    cells: {
      style: {
        border: "1px solid #ddd",
      },
    },
  };

  useEffect(() => {
    const result = customers.filter((item) => {
      return search.length !== 0
        ? item.user_name.toUpperCase().includes(search.toUpperCase())
        : true;
    });
    setFilteredCustomer(result);
  }, [search, customers]);
  return (
    <div className="selling">
      <div style={{ marginBottom: "10px" }}>
        <p className="title_page">Khách hàng</p>
      </div>
      <Modal
        title="Thông tin khách hàng"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ textAlign: "center" }}
        bodyStyle={{
          textAlign: "left",
          marginTop: "20px",
          width: "90vw",
          marginLeft: "15px",
        }}
        okButtonProps={{ style: { display: "none" } }}
      >
        {isModalOpen == true ? (
          <div>
            {selected.information != null ? (
              <img
                style={{
                  width: "140px",
                  height: "150px",
                  objectFit: "cover",
                  marginLeft: "11%",
                  marginBottom: "20px",
                  borderRadius: "5%",
                }}
                src={selected.information.avatar}
              />
            ) : (
              <></>
            )}

            {selected.information == null ? (
              <div>
                <p>
                  <b>Tên khách hàng : </b>
                  {selected.user_name}
                </p>
                <p>
                  <b> Email :</b> {selected.email}
                </p>
                <p>
                  <b>Địa chỉ :</b> Chưa có
                </p>
                <p>
                  <b>Tên đầy đủ :</b> chưa có
                </p>
                <p>
                  <b>Giới tính :</b> Chưa có
                </p>
                <p>
                  <b>Số điện thoại :</b> Chưa có
                </p>
              </div>
            ) : (
              <>
                <p>
                  <b>Tên khách hàng :</b> {selected.user_name}
                </p>
                <p>
                  <b>Tên đầy đủ :</b> {selected.information.fullName}
                </p>
                <p>
                  <b>Email :</b> {selected.email}
                </p>
                <p>
                  <b>Số điện thoại :</b> 0{selected.information.phoneNumber}
                </p>
                <p>
                  <b>Địa chỉ :</b> {selected.information.address}
                </p>
                <p>
                  <b>Giới tính :</b> {selected.information.gender}
                </p>
              </>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </Modal>

      <DataTable
        columns={columns}
        data={filteredCustomer}
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

export default Customers;

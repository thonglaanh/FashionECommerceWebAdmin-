import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Modal } from "antd";
import "../../styles/Row.css";
import config from "../../config";
import { SearchOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { Link } from "react-router-dom";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredCustomer, setFilteredCustomer] = useState([]);
  const [search, setSearch] = useState("");
  const [response, setResponse] = useState(null);
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
        setResponse(response);
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
      selector: (row) => {
        return (
          <>
            {row.information ? (
              <img
                className="row-image"
                src={
                  row.information.avatar ? row.information.avatar : "Chưa có"
                }
                alt="Avatar"
              />
            ) : (
              <img
                src={require("../../assets/no-pictures.png")}
                className="row-image"
              />
            )}
          </>
        );
      },
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
          {row.information?.address[0]?.customAddress
            ? row.information?.address[0]?.customAddress
            : "Chưa có"}
        </p>
      ),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <Link to={`/customers/${row._id}`} state={{ row }}>
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

  const handleDisable = async (customer) => {
    const userId = await localStorage.getItem("userId");
    const accessToken = await localStorage.getItem("accessToken");
    console.log(customer._id);
    console.log(userId);
    console.log(accessToken);
    await axios
      .put(
        config.API_IP + "/admin/disable/" + customer._id,
        {},
        {
          headers: {
            "x-xclient-id": userId,
            authorization: accessToken,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
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
    <div>
      {response ? (
        <div className="selling">
          <div style={{ marginBottom: "10px" }}>
            <p className="title_page">Khách hàng</p>
          </div>

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
                  style={{
                    position: "relative",
                    flex: "1",
                    marginLeft: "10px",
                  }}
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

export default Customers;

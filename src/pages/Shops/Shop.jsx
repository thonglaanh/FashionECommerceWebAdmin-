import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../../styles/Row.css";
import config from "../../config";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState({});

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
        const response = await axios.get(config.API_IP + "/admin/shop", {
          headers: {
            "x-xclient-id": userId,
            authorization: accessToken,
          },
        });
        setShops(response.data.message.mergedData);
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
      selector: (row) => (
        <>
          {row.avatarShop ? (
            <img className="row-image" src={row.avatarShop} />
          ) : (
            <img
              src={require("../../assets/no-pictures.png")} // Replace with the correct path
            />
          )}
        </>
      ),
    },

    {
      name: "Tên cửa hàng",
      selector: (row) => row.nameShop,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Số điện thoại",
      selector: (row) => `0${row.phoneNumberShop}`,
      sortable: true,
    },
    {
      name: "Địa chỉ",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Trạng thái",
      selector: (row) => (
        <div>
          {!row.disable ? (
            <p style={{ color: "green" }}>Hiện thị</p>
          ) : (
            <p style={{ color: "red" }}>Ẩn</p>
          )}
        </div>
      ),
      sortable: true,
    },

    {
      name: "Action",
      selector: (row) => (
        <Link to={`/shops/${row.nameShop}`} state={{ row }}>
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

  const [filteredShop, setFilteredShop] = useState([]);

  useEffect(() => {
    const result = shops.filter((item) => {
      return search.length !== 0
        ? item.nameShop.toUpperCase().includes(search.toUpperCase())
        : true;
    });
    setFilteredShop(result);
  }, [search, shops]);

  return (
    <div className="selling">
      {response ? (
        <>
          {" "}
          <Modal
            title="Thông tin cửa hàng"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {isModalOpen == true ? (
              <div>
                <img className="detail_image" src={selected.avatarShop} />
                <div>
                  <p>Id : {selected._id}</p>
                  <p>Tên cửa hàng : {selected.nameShop}</p>
                  <p>Email : {selected.email}</p>
                  <p>Liên hệ : 0{selected.phoneNumberShop}</p>
                  <p>Địa chỉ : {selected.address}</p>
                  <p>Giới thiệu : {selected.des}</p>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </Modal>
          <DataTable
            columns={columns}
            data={filteredShop}
            pagination
            responsive
            paginationPerPage={10}
            highlightOnHover
            customStyles={customHeader}
            striped
            subHeader
            className="my-box"
            subHeaderComponent={
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",

                  alignItems: "end",
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
        </>
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
                  fontSize: 24,
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

export default Shops;

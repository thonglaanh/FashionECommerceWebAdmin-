import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../../styles/Row.css";
import config from "../../config";
import { Link } from "react-router-dom";

const Shops = () => {
  const [shops, setShops] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState({});

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
        const response = await axios.get(config.API_IP + "/admin/shop", {
          headers: {
            "x-xclient-id": userId,
            authorization: accessToken,
          },
        });
        setShops(response.data.message);
        console.log(response.data.message);

        const response2 = await axios.get(
          config.API_IP + "/admin/statisticalByShopId/" + shops[0]._id,
          {
            headers: {
              "x-xclient-id": userId,
              authorization: accessToken,
            },
          }
        );
        console.log(response2);
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
          <img className="row-image" src={row.avatarShop} />
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
      selector: (row) => row.emailShop,
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
        border: "1px solid #ddd",
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
      <div style={{ marginBottom: "10px" }}>
        <p className="title_page">Cửa hàng</p>
      </div>
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
              <p>Email : {selected.emailShop}</p>
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

              alignItems: "end",
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

export default Shops;

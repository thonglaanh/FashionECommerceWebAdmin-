import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import slug from "slugifi";
import DataTable from "react-data-table-component";
import { Button, message, Modal } from "antd";

import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";

const convertToSlug = (text) => {
  return slug(text, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  });
};

const Event = () => {
  const [discount, setDiscount] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [search, setSearch] = useState("");
  const [filteredDiscount, setFilteredDiscount] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchData = () => {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("accessToken");
      axios
        .get(config.API_IP + "/admin/discount", {
          headers: {
            "x-xclient-id": userId,
            authorization: accessToken,
          },
        })
        .then((res) => {
          console.log(res.data.message);
          setDiscount(res.data.message);
        });
    };
    fetchData();
  }, []);
  const columns = [
    { name: "ID", selector: (row, index) => `#${index + 1}` },

    {
      name: "Tên sản phẩm",
      selector: (row) => row.discount_name,
      sortable: true,
    },

    {
      name: "Số lượng",
      selector: (row) => row.discount_code,
      sortable: true,
    },
    {
      name: "Bắt đầu",
      selector: (row) =>
        moment(row.discount_start_date).format("HH:mm:ss DD/MM/YYYY"),
      sortable: true,
    },
    {
      name: "Kết thúc",
      selector: (row) =>
        moment(row.discount_end_date).format("HH:mm:ss DD/MM/YYYY"),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <a
          className="view-detail"
          onClick={() => {
            showModal();
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
    const result = discount.filter((item) => {
      return search.length !== 0
        ? item.discount_name.toUpperCase().includes(search.toUpperCase())
        : true;
    });
    setFilteredDiscount(result);
  }, [search, discount]);
  return (
    <div className="selling">
      <p className="title_page">Giảm giá</p>
      <Modal
        title="Thông tin giảm giá"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ textAlign: "center" }}
        bodyStyle={{
          textAlign: "left",
          marginTop: "20px",
          width: "90vw",
          marginLeft: "10px",
        }}
      >
        {isModalOpen == true ? (
          <div>
            <p>Tên mã giảm giá : {selected.discount_name}</p>
            <p>Mã giảm giá : {selected.discount_code}</p>

            <p>Chi tiết : {selected.discount_des}</p>
            <p>
              Giảm :{" "}
              {selected.discount_value.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <p>
              Giảm cho sản phẩm trên:{" "}
              {selected.discount_min_order_value.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <p>
              Bắt đầu :{" "}
              {moment(selected.discount_start_date).format(
                "HH:mm:ss DD/MM/YYYY"
              )}
            </p>
            <p>
              Kết thúc :{" "}
              {moment(selected.discount_end_date).format("HH:mm:ss DD/MM/YYYY")}
            </p>
            <p>Loại mã : {selected.discount_type}</p>
          </div>
        ) : (
          <div></div>
        )}
      </Modal>

      <DataTable
        columns={columns}
        data={filteredDiscount}
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
            <Button type="primary" onClick={() => setOpenModal(!openModal)}>
              Thêm giảm giá
            </Button>
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

export default Event;

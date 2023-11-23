import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import DataTable from "react-data-table-component";
import "../../styles/Row.css";
import { Modal } from "antd";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState({});
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
      console.log(userId);
      console.log(accessToken);
      axios
        .get(config.API_IP + "/admin/product", {
          headers: {
            "x-xclient-id": userId,
            authorization: accessToken,
          },
        })
        .then((res) => {
          setProducts(res.data.message);
          console.log(res.data.message);
        });
    };
    fetchData();
  }, []);
  const columns = [
    { name: "ID", selector: (row, index) => `#${index + 1}` },
    {
      name: "Ảnh",
      selector: (row) => (
        <img className="row-image" src={row.product_thumb[0]} />
      ),
    },
    {
      name: "Tên sản phẩm",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Giá sản phẩm",
      selector: (row) => row.product_price,
      sortable: true,
    },
    {
      name: "Số lượng",
      selector: (row) => row.product_quantity,
      sortable: true,
    },
    {
      name: "Đánh giá",
      selector: (row) => row.product_ratingAverage,
      sortable: true,
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
      <div style={{ marginBottom: "10px" }}>
        <p className="title_page">Cửa hàng</p>
      </div>
      <Modal
        title="Thông tin sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {isModalOpen == true ? (
          <div>
            <img className="detail_image" src={selected.product_thumb[0]} />
            <p>Tên sản phẩm : {selected.product_name}</p>
            <p>Tên cửa hàng : {selected.product_shop.nameShop}</p>
            <p>Đánh giá : {selected.product_ratingAverage}</p>
            <p>Giá tiền : {selected.product_price}</p>
            <p>Còn lại : {selected.product_quantity}</p>
            <p>Chi tiết : {selected.product_description}</p>
          </div>
        ) : (
          <div></div>
        )}
      </Modal>

      <DataTable
        columns={columns}
        data={products}
        pagination
        responsive
        paginationPerPage={7}
        highlightOnHover
        customStyles={customHeader}
      />
    </div>
  );
};

export default Products;

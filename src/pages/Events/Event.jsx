import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { Link } from "react-router-dom";
import slug from "slugifi";
import DataTable from "react-data-table-component";
import { Modal } from "antd";
import moment from "moment";
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
        moment(selected.discount_start_date).format("HH:mm:ss DD/MM/YYYY"),
      sortable: true,
    },
    {
      name: "Kết thúc",
      selector: (row) =>
        moment(selected.discount_end_date).format("HH:mm:ss DD/MM/YYYY"),
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
  };
  return (
    <div className="selling">
      <p className="title_page">Discount</p>
      <Modal
        title="Thông tin giảm giá"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {isModalOpen == true ? (
          <div>
            <p>Mã giảm giá : {selected.discount_code}</p>
            <p>Tên mã giảm giá : {selected.discount_name}</p>
            <p>Chi tiết : {selected.discount_des}</p>
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
        data={discount}
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

export default Event;

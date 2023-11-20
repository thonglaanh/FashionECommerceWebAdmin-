import React, { useEffect, useState } from "react";
import EventAdd from "./EventAdd";
import ModalDelete from "../../components/ModalDelete";
import EventUpdate from "./EventUpdate";
import axios from "axios";
import config from "../../config";
import { Link } from "react-router-dom";
import slug from "slugifi";
import DataTable from "react-data-table-component";
const convertToSlug = (text) => {
  return slug(text, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  });
};

const Event = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [discount, setDiscount] = useState([]);
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
    { name: "ID", sortable: true, selector: (row, index) => `#${index + 1}` },

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
      selector: (row) => row.discount_start_date,
      sortable: true,
    },
    {
      name: "Kết thúc",
      selector: (row) => row.discount_end_date,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <Link
          to={`/products/${convertToSlug(row.discount_name)}`}
          state={{ row }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <a href="" className="view-detail">
            View detail
          </a>
        </Link>
      ),
      sortable: true,
    },
  ];
  return (
    <div className="selling">
      {openModal && (
        <EventAdd openModal={openModal} setOpenModal={setOpenModal} />
      )}
      {openModalDelete && (
        <ModalDelete
          openModal={openModalDelete}
          setOpenModal={setOpenModalDelete}
        />
      )}
      {openModalUpdate && (
        <EventUpdate
          openModal={openModalUpdate}
          setOpenModal={setOpenModalUpdate}
        />
      )}
      <p className="title-product">Event</p>
      <button class="add-button" onClick={() => setOpenModal(!openModal)}>
        Thêm dữ liệu
      </button>

      <DataTable columns={columns} data={discount} pagination responsive />
    </div>
  );
};

export default Event;

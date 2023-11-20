import React, { useEffect, useState } from "react";
import CategoryAdd from "./CategoryAdd";
import ModalDelete from "../../components/ModalDelete";
import CategoryUpdate from "./CategoryUpdate";
import config from "../../config";
import axios from "axios";
import DataTable from "react-data-table-component";
import "../../styles/Row.css";

const Categoties = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("accessToken");
      console.log(userId);
      console.log(accessToken);
      axios
        .get(config.API_IP + "/category/getAllCategory", {
          headers: {
            "x-xclient-id": userId,
            authorization: accessToken,
          },
        })
        .then((res) => {
          setCategories(res.data.message.category);
          console.log(categories);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchData();
  }, []);
  const columns = [
    { name: "ID", sortable: true, selector: (row, index) => `#${index + 1}` },
    {
      name: "Ảnh",
      selector: (row) => <img className="row-image" src={row.category_thumb} />,
      sortable: true,
    },
    {
      name: "Tên danh mục",
      selector: (row) => row.category_name,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button
            className="row-action-button "
            onClick={() => setOpenModalUpdate(true)}
          >
            Update
          </button>

          <button
            className="row-action-button "
            onClick={() => setOpenModalDelete(true)}
          >
            Delete
          </button>
        </div>
      ),
      sortable: true,
    },
  ];
  return (
    <div className="selling">
      {openModal && (
        <CategoryAdd openModal={openModal} setOpenModal={setOpenModal} />
      )}
      {openModalDelete && (
        <ModalDelete
          openModal={openModalDelete}
          setOpenModal={setOpenModalDelete}
        />
      )}
      {openModalUpdate && (
        <CategoryUpdate
          openModal={openModalUpdate}
          setOpenModal={setOpenModalUpdate}
        />
      )}
      <p className="title-product">Categories</p>
      <div className="option-menu">
        <button class="add-button" onClick={() => setOpenModal(!openModal)}>
          Thêm dữ liệu
        </button>
      </div>
      <DataTable columns={columns} data={categories} pagination responsive />
    </div>
  );
};

export default Categoties;

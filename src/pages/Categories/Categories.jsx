import React, { useEffect, useState } from "react";
import config from "../../config";
import axios from "axios";
import DataTable from "react-data-table-component";
import "../../styles/Row.css";
import { Button, message, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const AddCategoryModal = ({
  open,
  onCancel,
  onSubmit,
  name,
  setName,
  thumb,
  setThumb,
  img,
}) => {
  return (
    <Modal
      title="Thêm danh mục"
      open={open}
      onOk={onSubmit}
      onCancel={onCancel}
    >
      <div className="modal-container">
        <form>
          {(thumb || img) && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                alt="not found"
                width={"140px"}
                height={"140px"}
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={thumb ? URL.createObjectURL(thumb) : img}
              />
            </div>
          )}
          <label>
            <input
              type="file"
              onChange={(event) => {
                setThumb(event.target.files[0]);
              }}
              style={{ display: "none" }}
            />
            <div
              style={{
                position: "absolute",
                top: 160,
                left: 290,
                width: "40px",
                height: "40px",
              }}
            >
              <img
                src={require("../../assets/camera.png")}
                alt="Tải danh mục"
                style={{ width: "30px", height: "30px" }}
              />
            </div>
          </label>

          <label>Tên danh mục : </label>
          <input
            type="text"
            value={name}
            placeholder={"Vui lòng nhập danh mục"}
            onChange={(e) => setName(e.target.value)}
          />
          <div style={{ flexDirection: "row", width: "100%" }}></div>
        </form>
      </div>
    </Modal>
  );
};

const UpdateCategoryModal = ({
  open,
  onCancel,
  onSubmit,
  setName,
  setThumb,
  selected,
}) => {
  const [updatedCategoryName, setUpdatedCategoryName] = useState(
    selected ? selected.category_name : ""
  );

  // Introduce a separate state for the thumbnail in the modal
  const [modalThumb, setModalThumb] = useState(
    selected ? selected.category_thumb : ""
  );

  useEffect(() => {
    if (selected) {
      setUpdatedCategoryName(selected.category_name);
      setModalThumb(selected.category_thumb);
    }
  }, [selected]);

  const handleNameChange = (e) => {
    setUpdatedCategoryName(e.target.value);
    setName(e.target.value); // Update the parent component's state
  };

  return (
    <Modal title="Sửa danh mục" open={open} onOk={onSubmit} onCancel={onCancel}>
      <div className="modal-container">
        <form>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              alt="not found"
              width={"140px"}
              height={"140px"}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src={modalThumb}
            />
          </div>
          <label>
            <input
              type="file"
              onChange={(event) => {
                // Update the modalThumb state with the selected file
                setModalThumb(URL.createObjectURL(event.target.files[0]));
                // Update the parent component's state (setThumb)
                setThumb(event.target.files[0]);
              }}
              style={{ display: "none" }}
            />
            <div
              style={{
                position: "absolute",
                top: 160,
                left: 290,
                width: "40px",
                height: "40px",
              }}
            >
              <img
                src={require("../../assets/camera.png")}
                alt="Tải danh mục"
                style={{ width: "30px", height: "30px" }}
              />
            </div>
          </label>
          <label>Tên danh mục : </label>
          <input
            type="text"
            value={updatedCategoryName}
            placeholder={"Vui lòng nhập danh mục"}
            onChange={handleNameChange}
          />
          <div style={{ flexDirection: "row", width: "100%" }}></div>
        </form>
      </div>
    </Modal>
  );
};

const DeleteCategoryModal = ({ open, onCancel, onOk, selected }) => {
  return (
    <Modal title="Xóa danh mục" open={open} onOk={onOk} onCancel={onCancel}>
      <p>Bạn muốn xóa danh mục "{selected.category_name}" này chứ?</p>
    </Modal>
  );
};

const Categories = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState({});
  const [name, setName] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [img, setImg] = useState(
    "https://st2.depositphotos.com/1561359/12101/v/950/depositphotos_121012076-stock-illustration-blank-photo-icon.jpg"
  );
  const [thumb, setThumb] = useState(null);
  const [response, setResponse] = useState(null);

  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  const fetchData = () => {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(config.API_IP + "/admin/category", {
        headers: {
          "x-xclient-id": userId,
          authorization: accessToken,
        },
      })
      .then((res) => {
        setCategories(res.data.message);
        setResponse(res);
        console.log(res.data.message);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { name: "ID", selector: (row, index) => `#${index + 1}` },
    {
      name: "Ảnh",
      selector: (row) => (
        <img
          className="row-image"
          style={{ padding: "15px" }}
          src={row.category_thumb}
        />
      ),
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
          <a
            style={{ color: "green", cursor: "pointer", fontSize: "14px" }}
            onClick={() => {
              setOpenModalUpdate(true);
              setSelected(row);
            }}
          >
            Update
          </a>
          <a
            style={{
              color: "red",
              cursor: "pointer",
              marginLeft: "15px",
              fontSize: "14px",
            }}
            onClick={() => {
              setOpenModalDelete(true);
              setSelected(row);
            }}
          >
            {" "}
            Delete
          </a>
        </div>
      ),
    },
  ];

  const customHeader = {
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        backgroundColor: "#e0e0e0",
        minWidth: "50px",
        border: "1px solid #ddd",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.length <= 0 || !thumb) {
      await messageApi.open({
        type: "error",
        content: "Điền đủ thông tin!",
      });
      return;
    }
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
    try {
      const formData = new FormData();
      formData.append("category_name", name);
      formData.append("thumb", thumb);
      await axios.post(config.API_IP + `/category/createCategory`, formData, {
        headers: {
          "x-xclient-id": userId,
          authorization: accessToken,
        },
      });
      setOpenModal(false);
      fetchData();
      await messageApi.open({
        type: "success",
        content: "Thành công!",
      });
    } catch (error) {
      await messageApi.open({
        type: "error",
        content: "Thất bại!",
      });
      console.log("Failed" + error);
    }
  };
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    if (name.length <= 0 || !thumb) {
      await messageApi.open({
        type: "error",
        content: "Điền đủ thông tin!",
      });
      return;
    }
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
    try {
      const formData = new FormData();
      formData.append("category_name", name);
      formData.append("thumb", thumb);
      formData.append("id_category", selected._id);
      await axios.put(config.API_IP + `/category/updateCategory`, formData, {
        headers: {
          "x-xclient-id": userId,
          authorization: accessToken,
        },
      });
      setOpenModalUpdate(false);
      fetchData();
      await messageApi.open({
        type: "success",
        content: "Thành công!",
      });
    } catch (error) {
      await messageApi.open({
        type: "error",
        content: "Thất bại!",
      });
      console.log("Failed" + error);
    }
  };
  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
    try {
      const formData = new FormData();
      formData.append("id_category", selected._id);
      await axios.post(config.API_IP + `/category/deleteCategory`, formData, {
        headers: {
          "x-xclient-id": userId,
          authorization: accessToken,
        },
      });
      setOpenModalDelete(false);
      fetchData();
      await messageApi.open({
        type: "success",
        content: "Thành công!",
      });
    } catch (error) {
      console.log(selected._id);
      await messageApi.open({
        type: "error",
        content: "Thất bại!",
      });
      console.log("Failed" + error);
    }
  };

  useEffect(() => {
    const result = categories.filter((item) => {
      return search.length !== 0
        ? item.category_name.toUpperCase().includes(search.toUpperCase())
        : true;
    });
    setFilteredCategories(result);
  }, [search, categories]);

  return (
    <div>
      {response ? (
        <div className="selling">
          {contextHolder}
          <AddCategoryModal
            open={openModal}
            onCancel={() => setOpenModal(false)}
            onSubmit={(e) => handleSubmit(e)}
            name={name}
            setName={setName}
            thumb={thumb}
            setThumb={setThumb}
            img={img}
          />

          <UpdateCategoryModal
            open={openModalUpdate}
            onCancel={() => setOpenModalUpdate(false)}
            onSubmit={(e) => handleSubmitUpdate(e)}
            name={name}
            setName={setName}
            thumb={thumb}
            setThumb={setThumb}
            img={img}
            selected={selected}
          />

          <DeleteCategoryModal
            open={openModalDelete}
            onCancel={() => setOpenModalDelete(false)}
            onOk={(e) => handleSubmitDelete(e)}
            selected={selected}
          />

          <div style={{ marginBottom: "10px" }}>
            <p className="title_page">Danh mục</p>
          </div>

          <DataTable
            columns={columns}
            data={filteredCategories}
            pagination
            responsive
            paginationPerPage={7}
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
                  Thêm danh mục
                </Button>
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

export default Categories;

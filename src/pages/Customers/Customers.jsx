import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button, Modal } from "antd";
import "../../styles/Row.css";
import config from "../../config";
import { SearchOutlined } from "@ant-design/icons";

const Customers = () => {
  const [openModal, setOpenModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [name, setName] = useState("");
  const [filteredCustomer, setFilteredCustomer] = useState([]);

  const [img, setImg] = useState(
    "https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg"
  );
  const [email, setEmail] = useState();
  const [date, setDate] = useState();
  const [search, setSearch] = useState("");
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("date", date);
      formData.append("name", name);
      formData.append("img", selectedImage);
      const response = await axios.post(formData);
      localStorage.setItem(
        "account",
        JSON.stringify(response.data.data.account)
      );
    } catch (error) {
      console.log("Failed" + error);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
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
      >
        {isModalOpen == true ? (
          <div>
            {selected.information != null ? (
              <img className="detail_image" src={selected.information.avatar} />
            ) : (
              <></>
            )}
            <p>Tên khách hàng : {selected.user_name}</p>
            <p>Email : {selected.email}</p>

            {selected.information == null ? (
              <div>
                <p>Địa chỉ :chưa có</p>
                <p>Tên đầy đủ : chưa có</p>
                <p>Giới tính : Chưa có</p>
                <p>Số điện thoại : Chưa có</p>
              </div>
            ) : (
              <>
                <p>Địa chỉ : {selected.information.address}</p>
                <p>Tên đầy đủ : {selected.information.fullName}</p>
                <p>Giới tính : {selected.information.gender}</p>
                <p>Số điện thoại : 0{selected.information.phoneNumber}</p>
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

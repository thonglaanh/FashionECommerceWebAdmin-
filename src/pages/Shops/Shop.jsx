import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Modal } from "antd";
import "../../styles/Row.css";
import config from "../../config";

const Shops = () => {
  const [openModal, setOpenModal] = useState(false);
  const [shops, setShops] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [img, setImg] = useState(
    "https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg"
  );
  const [email, setEmail] = useState();
  const [date, setDate] = useState();
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
        const response = await axios.get(config.API_IP + "/admin/shop", {
          headers: {
            "x-xclient-id": userId,
            authorization: accessToken,
          },
        });
        setShops(response.data.message);
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
      selector: (row) => <img className="row-image" src={row.avatarShop} />,
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
  };

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
        data={shops}
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

export default Shops;

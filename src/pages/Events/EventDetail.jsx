import React, { useState } from "react";
import "../../styles/Detail.css";
import EventAdd from "./EventAdd";
import { useLocation } from "react-router-dom";
import ModalDelete from "../../components/ModalDelete";

const DetailEvent = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const location = useLocation();
  //   const customer = location.state.product;
  const customer = {
    image:
      "https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg",
    name: "Nguyễn Văn A",
    email: "nguyenvana123@gmail.com",
    location: "Phú Diễn, Từ Liêm, Hà Nội",
    phone: "0964863417",
    index: 6,
    gender: "Nam",
  };
  return (
    <div>
      {openModal && (
        <EventAdd openModal={openModal} setOpenModal={setOpenModal} />
      )}
      {openModalDelete && (
        <ModalDelete
          openModal={openModalDelete}
          setOpenModal={setOpenModalDelete}
        />
      )}
      <div className="detail_container">
        <div className="detail_container_image">
          <img className="detail_image" src={customer.image} />
        </div>
        <div className="detail_content">
          <div className="detail_content_customer">
            <p className="detail_title">Thông tin khách hàng : </p>
            <div>
              <img src={require("../../assets/signature.png")} />
              <p>Họ và tên : </p>
              <div className="detail_name">{customer.name}</div>
            </div>
            <div>
              <img src={require("../../assets/gmail.png")} />
              <p>Email : </p>
              <div className="detail_email">{customer.email}</div>
            </div>
            <div>
              <img src={require("../../assets/phone-call.png")} />
              <p>Số điện thoại : </p>
              <div className="detail_phone">{customer.phone}</div>
            </div>
            <div>
              <img src={require("../../assets/placeholder.png")} />
              <p>Địa chỉ : </p>
              <div className="detail_location">{customer.location}</div>
            </div>
            <div>
              <img src={require("../../assets/gender.png")} />
              <p>Giới tính : </p>
              <div className="detail_gender">{customer.gender}</div>
            </div>
          </div>
          <div
            style={{
              marginTop: "65px",
            }}
          >
            <button
              style={{
                width: "220px",
                height: "35px",
                border: "1px solid #e0e0e0",
              }}
              onClick={() => setOpenModalDelete(!openModalDelete)}
            >
              Xóa dữ liệu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailEvent;

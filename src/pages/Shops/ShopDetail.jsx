import React, { useState } from "react";
import "../../styles/Detail.css";
import { useLocation } from "react-router-dom";
import ModalDelete from "../../components/ModalDelete";
import CustomerAdd from "../Customers/CustomerAdd";

const ShopDetail = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const location = useLocation();
  //   const customer = location.state.product;
  const customer = {
    image:
      "https://bizweb.dktcdn.net/100/369/010/themes/914385/assets/brand1.png?1697908711435",
    name: "Dirty coin",
    email: "nguyenvana123@gmail.com",
    location: "Phú Diễn, Từ Liêm, Hà Nội",
    phone: "0964863417",
    index: 6,
    rating: "4.5/5",
    description:
      "Là local brand được ra mắt vào năm 2020 tại thành phố Hồ Chí Minh",
  };
  return (
    <div>
      {openModal && (
        <CustomerAdd openModal={openModal} setOpenModal={setOpenModal} />
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
            <p className="detail_title">Thông tin cửa hàng : </p>
            <div>
              <img src={require("../../assets/signature.png")} />
              <p>Tên shop: </p>
              <div className="detail_name">{customer.name}</div>
            </div>
            <div>
              <img src={require("../../assets/star.png")} />
              <p>Đánh giá : </p>
              <div className="detail_location">{customer.rating}</div>
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
              <img src={require("../../assets/three.png")} />
              <p>Description :</p>
              <div className="detail_gender">{customer.description}</div>
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

export default ShopDetail;

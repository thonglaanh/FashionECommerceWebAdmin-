import React, { useState } from "react";
import "../../styles/Detail.css";
import ProductAdd from "./ProductAdd";
import { useLocation } from "react-router-dom";
import ModalDelete from "../../components/ModalDelete";

const ProductDetail = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const location = useLocation();
  //   const customer = location.state.product;
  const product = {
    image:
      "https://mcdn.coolmate.me/image/June2021/top-7-dia-chi-mua-giay-da-nam-cao-cap-ha-noi-11.jpg",
    name: "Dày gia nam",
    price: "590.000vnd",
    quantity: "98",
    index: 2,
    descpition: "Là sản phẩm mới nhất của cửa hàng",
    shop: "Dirty coin",
    rating: "4.5",
  };
  return (
    <div>
      {openModal && (
        <ProductAdd openModal={openModal} setOpenModal={setOpenModal} />
      )}
      {openModalDelete && (
        <ModalDelete
          openModal={openModalDelete}
          setOpenModal={setOpenModalDelete}
        />
      )}
      <div className="detail_container">
        <div className="detail_container_image">
          <img className="detail_image" src={product.image} />
        </div>
        <div className="detail_content">
          <div className="detail_content_customer">
            <p className="detail_title">Thông tin sản phẩm : </p>
            <div>
              <img src={require("../../assets/signature.png")} />
              <p>Tên sản phẩm : </p>
              <div className="detail_name">{product.name}</div>
            </div>
            <div>
              <img src={require("../../assets/price-tag.png")} />
              <p>Giá sản phẩm : </p>
              <div className="detail_email">{product.price}</div>
            </div>
            <div>
              <img src={require("../../assets/phone-call.png")} />
              <p>Số lượng : </p>
              <div className="detail_phone">{product.quantity}</div>
            </div>
            <div>
              <img src={require("../../assets/star.png")} />
              <p>Đánh giá : </p>
              <div className="detail_gender">{product.rating}</div>
            </div>
            <div>
              <img src={require("../../assets/shop.png")} />
              <p>Cửa hàng : </p>
              <div className="detail_gender">{product.shop}</div>
            </div>
            <div>
              <img src={require("../../assets/three.png")} />
              <p>Giới tính : </p>
              <div className="detail_gender">{product.descpition}</div>
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

export default ProductDetail;

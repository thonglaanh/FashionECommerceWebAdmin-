import React, { useState } from "react";
import "../../styles/Detail.css";
import { useLocation } from "react-router-dom";

const ProductDetail = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const location = useLocation();
  const product = location.state.row;
  return (
    <div>
      <div className="detail_container">
        <div className="detail_container_image">
          <img className="detail_image" src={product.product_thumb[0]} />
        </div>
        <div className="detail_content">
          <div className="detail_content_customer">
            <p className="detail_title">Thông tin sản phẩm : </p>
            <div>
              <img src={require("../../assets/signature.png")} />
              <p>Tên sản phẩm : </p>
              <div className="detail_name">{product.product_name}</div>
            </div>
            <div>
              <img src={require("../../assets/price-tag.png")} />
              <p>Giá sản phẩm : </p>
              <div className="detail_email">{product.product_price}</div>
            </div>
            <div>
              <img src={require("../../assets/phone-call.png")} />
              <p>Số lượng : </p>
              <div className="detail_phone">{product.product_quantity}</div>
            </div>
            <div>
              <img src={require("../../assets/star.png")} />
              <p>Đánh giá : </p>
              <div className="detail_gender">{product.product_rating}</div>
            </div>
            <div>
              <img src={require("../../assets/shop.png")} />
              <p>Cửa hàng : </p>
              <div className="detail_gender">
                {product.product_shop.nameShop}
              </div>
            </div>
            <div>
              <img src={require("../../assets/three.png")} />
              <p>Chi tiết sản phẩm : </p>
              <div className="detail_gender">{product.product_description}</div>
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

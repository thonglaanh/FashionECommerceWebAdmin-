import React, { useState } from "react";
import "../../styles/Detail.css";
import { useLocation } from "react-router-dom";
import { Button, message, Modal } from "antd";
import axios from "axios";
import config from "../../config";

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state.row;

  const handlerUnPublish = async () => {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
    const formData = {
      shopId: product.product_shop._id,
      content: "Sản phẩm đã bị vô hiệu hóa do vi phạm nguyên tắc sản phẩm !",
      productId: product._id,
    };
    console.log(formData);
    const res = await axios.post(
      config.API_IP + "/admin/unpublishedProductByAdmin",
      formData,
      {
        headers: {
          "x-xclient-id": userId,
          authorization: accessToken,
        },
      }
    );
    console.log(res);
  };

  console.log(product);
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
              <img src={require("../../assets/shop.png")} />
              <p>Cửa hàng : </p>
              <div className="detail_gender">
                {product.product_shop.nameShop}
              </div>
            </div>
            <div>
              <img src={require("../../assets/price-tag.png")} />
              <p>Giá sản phẩm : </p>
              <div className="detail_email">
                {" "}
                {product.product_price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
            </div>
            <div>
              <img src={require("../../assets/attribute.png")} />
              <p>Thuộc tính : </p>
              <div className="detail_phone">
                {product.product_attributes.map((attribute, index) => (
                  <div key={index}>
                    <div className="detail_phone"> | {attribute.color} | </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img src={require("../../assets/quantity.png")} />
              <p>Số lượng : </p>
              <div className="detail_phone">{product.product_quantity}</div>
            </div>
            <div>
              <img src={require("../../assets/star.png")} />
              <p>Đánh giá : </p>
              <div className="detail_gender">
                {product.product_ratingAverage}
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
              marginTop: "15px",
            }}
          >
            <button
              style={{
                width: "220px",
                height: "35px",
                color: "white",
                border: "1px solid #e0e0e0",
                backgroundColor: "red",
              }}
              onClick={() => handlerUnPublish()}
            >
              Vô hiệu hóa sản phẩm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

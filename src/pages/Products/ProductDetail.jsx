import React, { useEffect, useState } from "react";
import "../../styles/Detail.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, message, Modal } from "antd";
import axios from "axios";
import config from "../../config";

const ProductDetail = () => {
  const location = useLocation();
  const product = location.state.row;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const nav = useNavigate();

  const handlerUnPublish = async () => {
    const userId = await localStorage.getItem("userId");
    const accessToken = await localStorage.getItem("accessToken");
    const formData = {
      shopId: product.product_shop._id,
      content: "Sản phẩm đã bị vô hiệu hóa do vi phạm nguyên tắc sản phẩm !",
      productId: product._id,
    };
    console.log(formData);
    await axios.post(
      config.API_IP + "/admin/unpublishedProductByAdmin",
      formData,
      {
        headers: {
          "x-xclient-id": userId,
          authorization: accessToken,
        },
      }
    );
    await messageApi.open({
      type: "success",
      content: "Thành công",
    });
    setIsModalOpen(false);
    nav("/products");
  };
  console.log(product);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    handlerUnPublish();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      {contextHolder}
      <Modal
        title="Log out"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { background: "red", borderColor: "red" } }}
      >
        <p>Bạn có chắc chắn muốn ẩn sản phẩm này không ?</p>
      </Modal>
      <div className="detail_container">
        <div className="detail_container_image">
          <img
            className="detail_image"
            src={`/uploads/${product.product_thumb[0]}`}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "10px 200px 10px 10px",
            }}
          >
            {product.product_thumb.map((image, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <img
                  style={{ width: "50px", gap: "10px" }}
                  src={`/uploads/${image}`}
                  alt={`Thumbnail ${index}`}
                />
              </div>
            ))}
          </div>
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
                    <div
                      style={{
                        border: "1px solid #000",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        margin: "0 0.5em",
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "#fff",
                      }}
                    >
                      <p style={{ textDecoration: "none", color: "#000" }}>
                        {attribute.color}
                      </p>
                    </div>
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
              <div>
                {" "}
                <img src={require("../../assets/three.png")} />
                <p>Chi tiết sản phẩm : </p>
              </div>
            </div>
          </div>
          <div className="detail_gender">{product.product_description}</div>
          <div
            style={{
              marginTop: "15px",
            }}
          >
            {product.isPublished ? (
              <button
                style={{
                  width: "250px",
                  height: "35px",
                  color: "white",
                  border: "1px solid #e0e0e0",
                  backgroundColor: "red",
                }}
                onClick={() => showModal()}
              >
                Ẩn sản phẩm
              </button>
            ) : (
              <button
                style={{
                  width: "250px",
                  height: "35px",
                  color: "white",
                  backgroundColor: "gray",
                  border: "none",
                }}
                disabled={true}
                onClick={() => showModal()}
              >
                Sản phẩm đã bị ẩn
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

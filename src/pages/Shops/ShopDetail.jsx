import React, { useState } from "react";
import "../../styles/Detail.css";
import { useLocation } from "react-router-dom";
import { message, Modal } from "antd";
import axios from "axios";
import config from "../../config";

const ShopDetail = () => {
  const location = useLocation();
  const product = location.state.row;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

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
    await messageApi.open({
      type: "success",
      content: "Thành công",
    });
    setIsModalOpen(false);
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
        <p>Bạn có chắc chắn muốn vô hiệu hóa sản phẩm này không ?</p>
      </Modal>
      <div className="detail_container">
        <div className="detail_container_image">
          <img className="detail_image" src={`/${product.avatarShop}`} />
        </div>
        <div className="detail_content">
          <div className="detail_content_customer">
            <p className="detail_title">Thông tin sản phẩm : </p>
            <div>
              <img src={require("../../assets/shop.png")} />
              <p>Cửa hàng : </p>
              <div className="detail_gender">{product.nameShop}</div>
            </div>

            <div>
              <img src={require("../../assets/gmail.png")} />
              <p>Email cửa hàng : </p>
              <div className="detail_phone">{product.emailShop}</div>
            </div>
            <div>
              <img src={require("../../assets/placeholder.png")} />
              <p>Địa chỉ : </p>
              <div className="detail_phone">{product.address}</div>
            </div>
            <div>
              <img src={require("../../assets/phone-call.png")} />
              <p>Số điện thoại : </p>
              <div className="detail_gender">0{product.phoneNumberShop}</div>
            </div>

            <div>
              <img src={require("../../assets/three.png")} />
              <p>Chi tiết : </p>
              <div className="detail_gender">{product.des}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;

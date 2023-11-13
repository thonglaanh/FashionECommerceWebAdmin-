import React, { useEffect, useState } from "react";
import "../../styles/Modal.css";
import axios from "axios";

const ShopAdd = ({ openModal, setOpenModal }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const [img, setImg] = useState(
    "https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg"
  );
  const [date, setDate] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("date", date);
      formData.append("name", name);
      formData.append("img", selectedImage); // Gửi ảnh đã chọn lên server
      const response = await axios.post(formData);
      localStorage.setItem(
        "account",
        JSON.stringify(response.data.data.account)
      );
    } catch (error) {
      console.log("Failed" + error);
    }
  };

  return (
    <div className="main-container">
      <div className="modal_container_shop modal-container">
        <p style={{ fontSize: "25px", fontWeight: "400", textAlign: "center" }}>
          Thêm cửa hàng
        </p>
        <form>
          {(selectedImage || img) && (
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
                src={selectedImage ? URL.createObjectURL(selectedImage) : img}
              />
            </div>
          )}
          <label>
            <input
              type="file"
              onChange={(event) => {
                setSelectedImage(event.target.files[0]); // Cập nhật ảnh đã chọn vào trạng thái selectedImage
              }}
              style={{ display: "none" }}
            />
            <div
              style={{
                position: "absolute",
                top: 170,
                left: 320,
                width: "40px",
                height: "40px",
              }}
            >
              <img
                src={require("../../assets/camera.png")}
                alt="Tải lên avatar"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </label>

          <label>Họ và tên : </label>
          <input
            type="text"
            value={name}
            placeholder={"Vui lòng nhập tên shop của bạn"}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email :</label>
          <input
            type="text"
            value={email}
            placeholder={"Vui lòng nhập email shop"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Điện thoại :</label>
          <input
            type="text"
            value={email}
            placeholder={"Vui lòng nhập số điện thoại shop"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Địa chỉ:</label>
          <input
            type="text"
            value={email}
            placeholder={"Vui lòng nhập số địa chỉ"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Nhập chi tiết shop :</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder={"Vui lòng nhập chi tiết shop của bạn"}
          />
          <button
            onClick={() => setOpenModal(false)}
            style={{
              background: "#fff",
              border: "1px solid #777777",
              color: "#777777",
            }}
          >
            Hủy
          </button>
          <button onClick={() => handleSubmit()}>Thay đổi</button>
        </form>
      </div>
    </div>
  );
};

export default ShopAdd;

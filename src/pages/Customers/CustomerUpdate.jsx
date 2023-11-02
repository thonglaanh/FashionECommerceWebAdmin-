import React, { useEffect, useState } from "react";
import "../../styles/Modal.css";
import axios from "axios";

const CustomerUpdate = ({ openModal, setOpenModal }) => {
  const account = JSON.parse(localStorage.getItem("account"));
  const accountDate = account.date ? new Date(account.date) : null;
  const formattedAccountDate = accountDate
    ? accountDate.toISOString().split("T")[0]
    : "";
  const [name, setName] = useState(account.name);
  const [email, setEmail] = useState(account.email);
  const [img, setImg] = useState(account.img);
  const [date, setDate] = useState(formattedAccountDate);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("date", date);
      formData.append("name", name);
      formData.append("img", selectedImage); // Gửi ảnh đã chọn lên server
      const response = await axios.put(
        "http://localhost:4000/customer/update/" + account._id,
        formData
      );
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
      <div className="modal-container">
        <p style={{ fontSize: "25px", fontWeight: "400", textAlign: "center" }}>
          Sửa thông tin cá nhân
        </p>
        <form>
          {/* Hiển thị ảnh đã chọn hoặc ảnh từ tài khoản */}
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
                top: 190,
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
            placeholder={"Vui lòng nhập họ tên của bạn"}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email :</label>
          <input
            type="email"
            value={email}
            placeholder={"Vui lòng nhập địa chỉ email"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Ngày sinh :</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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

export default CustomerUpdate;

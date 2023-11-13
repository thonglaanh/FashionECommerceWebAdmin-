import React, { useEffect, useState } from "react";
import "../../styles/Modal.css";
import axios from "axios";

const EventUpdate = ({ openModal, setOpenModal }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const [img, setImg] = useState(
    "https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg"
  );
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("dateStart", dateStart);
      formData.append("dateEnd", dateEnd);
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
      <div className="modal_container_event modal-container">
        <p style={{ fontSize: "25px", fontWeight: "400", textAlign: "center" }}>
          Sửa sự kiện
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
                setSelectedImage(event.target.files[0]);
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

          <label>Tên sự kiện: </label>
          <input
            type="text"
            value={name}
            placeholder={"Vui lòng nhập tên sự kiện"}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Ngày bắt đầu :</label>
          <input
            type="date"
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}
          />
          <label>Ngày kết thúc :</label>
          <input
            type="date"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
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

export default EventUpdate;

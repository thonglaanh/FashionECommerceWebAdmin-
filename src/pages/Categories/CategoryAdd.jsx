import React, { useState } from "react";
import "../../styles/Modal.css";
import axios from "axios";
import config from "../../config";

const CategoryAdd = ({ openModal, setOpenModal }) => {
  const [name, setName] = useState("");
  const [img, setImg] = useState(
    "https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg"
  );
  const [thumb, setThumb] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
    try {
      const formData = new FormData();
      formData.append("category_name", name);
      formData.append("thumb", thumb);
      await axios.post(config.API_IP + `/category/createCategory`, formData, {
        headers: {
          "x-xclient-id": userId,
          authorization: accessToken,
        },
      });
      setOpenModal(false);
    } catch (error) {
      console.log("Failed" + error);
    }
  };

  return (
    <div className="main-container">
      <div
        className="modal_container_category modal-container"
        style={{ height: "370px" }}
      >
        <p style={{ fontSize: "25px", fontWeight: "400", textAlign: "center" }}>
          Thêm danh mục
        </p>
        <form>
          {(thumb || img) && (
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
                src={thumb ? URL.createObjectURL(thumb) : img}
              />
            </div>
          )}
          <label>
            <input
              type="file"
              onChange={(event) => {
                setThumb(event.target.files[0]);
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
                alt="Tải danh mục"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </label>

          <label>Họ và tên : </label>
          <input
            type="text"
            value={name}
            placeholder={"Vui lòng nhập danh mục"}
            onChange={(e) => setName(e.target.value)}
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
          <button onClick={(e) => handleSubmit(e)}>Thêm</button>
        </form>
      </div>
    </div>
  );
};

export default CategoryAdd;

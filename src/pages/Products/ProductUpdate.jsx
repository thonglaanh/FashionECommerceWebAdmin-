import React, { useEffect, useState } from "react";
import "../../styles/Modal.css";
import axios from "axios";

const ProductUpdate = ({ openModal, setOpenModal }) => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [img, setImg] = useState(
    "https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg"
  );
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
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
      <div className="modal_container_product modal-container">
        <p style={{ fontSize: "25px", fontWeight: "400", textAlign: "center" }}>
          Thêm sản phẩm
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
          <label>Cửa hàng: </label>
          <div>
            <select class="filter-dropdown-select">
              <option value="all">Tất cả</option>
              <option value="option1">Tùy chọn 1</option>
              <option value="option2">Tùy chọn 2</option>
              <option value="option3">Tùy chọn 3</option>
            </select>
          </div>

          <label>Tên sản phẩm : </label>
          <input
            type="text"
            value={name}
            placeholder={"Vui lòng nhập tên sản phẩm"}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Nhập giá sản phẩm :</label>
          <input
            type="text"
            value={price}
            placeholder={"Vui lòng nhập giá sản phẩm"}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label>Số lượng:</label>
          <input
            type="number"
            value={quantity}
            placeholder={"Vui lòng nhập số lượng  "}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <label>Chi tiết:</label>
          <input
            type="text"
            value={description}
            placeholder={"Vui lòng nhập chi tiết  "}
            onChange={(e) => setDescription(e.target.value)}
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
          <button onClick={() => handleSubmit()}>Thêm mới</button>
        </form>
      </div>
    </div>
  );
};

export default ProductUpdate;

import React, { useEffect, useState } from "react";
import "../styles/Modal.css";

const ModalDelete = ({ openModal, setOpenModal }) => {
  return (
    <div className="main-container">
      <div className="modal-container-delete">
        <p style={{ fontSize: "25px", fontWeight: "400", textAlign: "center" }}>
          Bạn có chắc chắn muốn xóa dữ liệu này chứ ?
        </p>
        <div
          style={{
            marginTop: "65px",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              width: "220px",
              height: "35px",
              border: "1px solid #e0e0e0",
            }}
          >
            Hủy
          </button>
          <button
            style={{
              width: "220px",
              height: "35px",
              border: "none",
              marginLeft: "20px",
              background: "red",
              color: "#fff",
            }}
            onClick={() => setOpenModal(!openModal)}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;

import React, { useState } from "react";
import Pagingation from "../../components/Pagingation";
import ItemCustomers from "../../components/Items/ItemCustomers";
import CustomerAdd from "./CustomerAdd";

const Customers = () => {
  const [openModal, setOpenModal] = useState(false);
  const itemCustomers = [
    {
      image:
        "https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg",
      name: "Nguyễn Văn A",
      email: "nguyenvana123@gmail.com",
      location: "Hà Nội",
      index: 1,
    },
    {
      image:
        "https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg",
      name: "Nguyễn Văn A",
      email: "nguyenvana123@gmail.com",
      location: "Hà Nội",
      index: 2,
    },
    {
      image:
        "https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg",
      name: "Nguyễn Văn A",
      email: "nguyenvana123@gmail.com",
      location: "Hà Nội",
      index: 3,
    },
    {
      image:
        "https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg",
      name: "Nguyễn Văn A",
      email: "nguyenvana123@gmail.com",
      location: "Hà Nội",
      index: 4,
    },
    {
      image:
        "https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg",
      name: "Nguyễn Văn A",
      email: "nguyenvana123@gmail.com",
      location: "Hà Nội",
      index: 5,
    },
    {
      image:
        "https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg",
      name: "Nguyễn Văn A",
      email: "nguyenvana123@gmail.com",
      location: "Hà Nội",
      index: 6,
    },
  ];
  return (
    <div className="selling">
      {openModal && (
        <CustomerAdd openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <p className="title-product">Product</p>
      <div className="option-menu">
        <button class="add-button" onClick={() => setOpenModal(!openModal)}>
          Thêm dữ liệu
        </button>
        <div class="filter-dropdown">
          <select class="filter-dropdown-select">
            <option value="all">Tất cả</option>
            <option value="option1">Tùy chọn 1</option>
            <option value="option2">Tùy chọn 2</option>
            <option value="option3">Tùy chọn 3</option>
          </select>
        </div>
      </div>

      <div className="title-table">
        <p>Index</p>
        <p>Image</p>
        <p>Name</p>
        <p>Email</p>
        <p>Location</p>
        <p>Action</p>
      </div>

      {itemCustomers.map((item, index) => (
        <div key={index}>
          <ItemCustomers customer={item} />
        </div>
      ))}
      <Pagingation />
    </div>
  );
};

export default Customers;

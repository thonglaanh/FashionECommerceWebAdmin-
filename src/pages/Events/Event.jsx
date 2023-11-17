import React, { useState } from "react";
import Pagingation from "../../components/Pagingation";
import ItemEvents from "../../components/Items/ItemEvents";
import EventAdd from "./EventAdd";
import ModalDelete from "../../components/ModalDelete";
import EventUpdate from "./EventUpdate";

const Event = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const itemEvents = [
    {
      image:
        "https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg",
      name: "Nguyễn Văn A",
      start: "01-01-2024",
      end: "21-01-2024",
      index: 7,
    },
    {
      image:
        "https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg",
      name: "Nguyễn Văn A",
      start: "01-01-2024",
      end: "21-01-2024",
      index: 6,
    },
    {
      image:
        "https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg",
      name: "Nguyễn Văn A",
      start: "01-01-2024",
      end: "21-01-2024",
      index: 5,
    },
    {
      image:
        "https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg",
      name: "Nguyễn Văn A",
      start: "01-01-2024",
      end: "21-01-2024",
      index: 4,
    },
    {
      image:
        "https://tiemanhsky.com/wp-content/uploads/2020/03/61103071_2361422507447925_6222318223514140672_n_1.jpg",
      name: "Nguyễn Văn A",
      start: "01-01-2024",
      end: "21-01-2024",
      index: 3,
    },
  ];
  return (
    <div className="selling">
      {openModal && (
        <EventAdd openModal={openModal} setOpenModal={setOpenModal} />
      )}
      {openModalDelete && (
        <ModalDelete
          openModal={openModalDelete}
          setOpenModal={setOpenModalDelete}
        />
      )}
      {openModalUpdate && (
        <EventUpdate
          openModal={openModalUpdate}
          setOpenModal={setOpenModalUpdate}
        />
      )}
      <p className="title-product">Event</p>
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
        <p>Start</p>
        <p>End</p>
        <p>Action</p>
      </div>

      {itemEvents.map((item, index) => (
        <div key={index}>
          <ItemEvents
            event={item}
            setOpenModalDelete={setOpenModalDelete}
            setOpenModalUpdate={setOpenModalUpdate}
          />
        </div>
      ))}
      <Pagingation />
    </div>
  );
};

export default Event;
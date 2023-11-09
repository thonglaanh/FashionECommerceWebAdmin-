import React, { useState } from "react";
import Pagingation from "../../components/Pagingation";
import ItemShop from "../../components/Items/ItemShop";
import ShopAdd from "./ShopAdd";
const Shop = () => {
  const [openModal, setOpenModal] = useState(false);
  const itemProducts = [
    {
      image:
        "https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/318068307_5817467454976182_3633574062683588495_n.jpg?1692958575148",
      name: "Teelab",
      rate: "4/5",
      quantity: "100",
      index: 1,
    },
    {
      image:
        "https://localbrand.vn/wp-content/uploads/2021/07/levents-local-brand-1.jpg",
      name: "Levent",
      rate: "4.5/5",
      quantity: "98",
      index: 2,
    },
    {
      image:
        "https://filebroker-cdn.lazada.vn/kf/Sc3c175e3adfd470aadd84b3107f1720dq.jpg",
      name: "Coolmate",
      rate: "3/5",
      quantity: "85",
      index: 3,
    },
    {
      image: "https://img.ws.mms.shopee.vn/4464aa5f9ff3bd6ddd36f0f21fa1b3e9",
      name: "Badhabits",
      rate: "5/5",
      quantity: "77",
      index: 4,
    },
    {
      image:
        "https://bizweb.dktcdn.net/100/369/010/themes/914385/assets/brand1.png?1697908711435",
      name: "Dirty coin",
      rate: "4/5",
      quantity: "77",
      index: 5,
    },
  ];
  return (
    <div className="selling">
      {openModal && (
        <ShopAdd openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <p className="title-product">Shops</p>
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
        <p>Quantity product</p>
        <p>Rate</p>
        <p>Action</p>
      </div>

      {itemProducts.map((item, index) => (
        <div key={index}>
          <ItemShop shop={item} />
        </div>
      ))}
      <Pagingation />
    </div>
  );
};

export default Shop;

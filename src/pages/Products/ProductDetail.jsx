import React from "react";
import Item from "../../components/Items/ItemProducts";
import Pagingation from "../../components/SideBar";

const ProductDetail = () => {
  const itemProducts = [
    {
      image:
        "https://toigingiuvedep.vn/wp-content/uploads/2022/04/ao-thun-in-hinh-1.jpg",
      name: "Áo thun in hình",
      price: "210.000vnd",
      quantity: "100",
      index: 1,
    },
    {
      image:
        "https://mcdn.coolmate.me/image/June2021/top-7-dia-chi-mua-giay-da-nam-cao-cap-ha-noi-11.jpg",
      name: "Dày gia nam",
      price: "590.000vnd",
      quantity: "98",
      index: 2,
    },
    {
      image:
        "https://filebroker-cdn.lazada.vn/kf/Sc3c175e3adfd470aadd84b3107f1720dq.jpg",
      name: "Balo thời trang",
      price: "310.000vnd",
      quantity: "85",
      index: 3,
    },
    {
      image:
        "https://vn-live-01.slatic.net/p/cf8553bfffe718788d752eb4e5fa255c.jpg",
      name: "Quần bò ống vuông nữ",
      price: "310.000vnd",
      quantity: "77",
      index: 4,
    },
    {
      image:
        "https://bizweb.dktcdn.net/thumb/grande/100/415/697/products/1-2-94da2566-ee60-4219-a8ad-73b351a487fc.jpg?v=1662543595320",
      name: "Teelab áo sơ mi nam",
      price: "220.000vnd",
      quantity: "77",
      index: 5,
    },
    {
      image:
        "https://bizweb.dktcdn.net/100/415/697/products/1s-1671872736257.jpg?v=1671872857200",
      name: "Quần bò ống vuông nữ",
      price: "310.000vnd",
      quantity: "77",
      index: 6,
    },
    {
      image:
        "https://bizweb.dktcdn.net/100/415/697/products/1-a76844f8-43b5-4ba4-8f94-08ff2f36394a.jpg?v=1657108723990",
      name: "Quần bò ống vuông nữ",
      price: "310.000vnd",
      quantity: "77",
      index: 7,
    },
  ];
  return (
    <div className="selling">
      <p className="title-product">Product</p>
      <div className="option-menu">
        <button class="add-button">Thêm dữ liệu</button>
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
        <p>Price</p>
        <p>Quantity</p>
        <p>Action</p>
      </div>

      {itemProducts.map((item, index) => (
        <div key={index}>
          <Item product={item} />
        </div>
      ))}
      <Pagingation />
    </div>
  );
};

export default ProductDetail;

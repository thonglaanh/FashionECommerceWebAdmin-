import React from "react";
import "../../styles/Item.css";
const ItemShop = ({ shop }) => {
  return (
    <div className="product-container">
      <p className="product-index">#{shop.index}</p>
      <>
        <img className="product-image" src={shop.image} />
        <p>{shop.name}</p>
      </>

      <p className="product-quantity">{shop.quantity}</p>
      <p className="product-rate">
        <img src={require("../../assets/star.png")} />
        {shop.rate}
      </p>
      <a href="" className="view-detail">
        View detail
      </a>
    </div>
  );
};

export default ItemShop;

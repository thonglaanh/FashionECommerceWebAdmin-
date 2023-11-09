import React from "react";
import "../../styles/Item.css";
import { Link } from "react-router-dom";
import slug from "slugifi";
const ItemShop = ({ shop }) => {
  const convertToSlug = (text) => {
    return slug(text, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
  };
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
      <Link
        to={`/shop/${convertToSlug(shop.name)}`}
        state={{ shop }}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <a href="" className="view-detail">
          View detail
        </a>
      </Link>
    </div>
  );
};

export default ItemShop;

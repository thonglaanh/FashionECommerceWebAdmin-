import React from "react";
import "../../styles/Item.css";
import { Link } from "react-router-dom";
import slug from "slugifi";
const ItemProduct = ({ product }) => {
  const convertToSlug = (text) => {
    return slug(text, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
  };
  return (
    <div className="product-container">
      <p className="product-index">#{product.index}</p>
      <>
        <img className="product-image" src={product.image} />
        <p>{product.name}</p>
      </>
      <p className="product-price">{product.price}</p>
      <p className="product-quantity">{product.quantity}</p>
      <Link
        to={`/products/${convertToSlug(product.name)}`}
        state={{ product }}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <a href="" className="view-detail">
          View detail
        </a>
      </Link>
    </div>
  );
};

export default ItemProduct;

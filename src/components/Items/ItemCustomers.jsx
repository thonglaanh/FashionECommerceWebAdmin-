import React from "react";
import "../../styles/Item.css";
import slug from "slugifi";
import { Link } from "react-router-dom";
const ItemCustomers = ({ customer }) => {
  const convertToSlug = (text) => {
    return slug(text, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
  };
  return (
    <div className="product-container">
      <p className="product-index">#{customer.index}</p>
      <>
        <img className="product-image" src={customer.image} />
        <p>{customer.name}</p>
      </>
      <p className="product-price">{customer.email}</p>
      <p className="product-quantity">{customer.location}</p>
      <Link
        to={`/customers/${convertToSlug(customer.name)}`}
        state={{ customer }}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <a href="" className="view-detail">
          View detail
        </a>
      </Link>
    </div>
  );
};

export default ItemCustomers;

import React from "react";
import "../../styles/Item.css";
import { Link } from "react-router-dom";
import slug from "slugifi";
const ItemEvents = ({ event }) => {
  const convertToSlug = (text) => {
    return slug(text, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
  };
  return (
    <div className="product-container">
      <p className="product-index">#{event.index}</p>
      <>
        <img className="product-image" src={event.image} />
        <p>{event.name}</p>
      </>
      <p className="product-price">{event.start}</p>
      <p className="event-end">{event.end}</p>
      <Link
        to={`/events/${convertToSlug(event.name)}`}
        state={{ event }}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <a href="" className="view-detail">
          View detail
        </a>
      </Link>
    </div>
  );
};

export default ItemEvents;

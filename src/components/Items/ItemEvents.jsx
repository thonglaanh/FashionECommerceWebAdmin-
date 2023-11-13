import React from "react";
import "../../styles/Item.css";
import { Link } from "react-router-dom";
import slug from "slugifi";
const ItemEvents = ({ event, setOpenModalUpdate, setOpenModalDelete }) => {
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
      <div>
        <button className="btn_update" onClick={() => setOpenModalUpdate(true)}>
          Update
        </button>

        <button className="btn_delete" onClick={() => setOpenModalDelete(true)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ItemEvents;

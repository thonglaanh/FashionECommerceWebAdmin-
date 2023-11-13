import React from "react";
import "../../styles/Item.css";
const ItemCategory = ({ category, setOpenModalDelete, setOpenModalUpdate }) => {
  return (
    <div className="category-container">
      <p className="product-index">#{category.index}</p>
      <>
        <img className="product-image" src={category.image} />
        <p>{category.name}</p>
      </>
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

export default ItemCategory;

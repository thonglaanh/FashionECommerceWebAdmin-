import React, { useEffect, useState } from "react";
import ProductAdd from "./ProductAdd";
import axios from "axios";
import config from "../../config";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import slug from "slugifi";
import "../../styles/Row.css";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState([]);
  const convertToSlug = (text) => {
    return slug(text, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
  };
  useEffect(() => {
    const fetchData = () => {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("accessToken");
      console.log(userId);
      console.log(accessToken);
      axios
        .get(config.API_IP + "/admin/product", {
          headers: {
            "x-xclient-id": userId,
            authorization: accessToken,
          },
        })
        .then((res) => {
          setProducts(res.data.message);
          console.log(res);
        });
    };
    fetchData();
  }, []);
  const columns = [
    { name: "ID", sortable: true, selector: (row, index) => `#${index + 1}` },
    {
      name: "Ảnh",
      selector: (row) => (
        <img className="row-image" src={row.product_thumb[0]} />
      ),
      sortable: true,
    },
    {
      name: "Tên sản phẩm",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Giá sản phẩm",
      selector: (row) => row.product_price,
      sortable: true,
    },
    {
      name: "Số lượng",
      selector: (row) => row.product_quantity,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <Link
          to={`/products/${convertToSlug(row.product_name)}`}
          state={{ row }}
        >
          <a href="" className="view-detail">
            View detail
          </a>
        </Link>
      ),
      sortable: true,
    },
  ];
  return (
    <div className="selling">
      {openModal && (
        <ProductAdd openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <p className="title-product">Products</p>
      <button class="add-button" onClick={() => setOpenModal(!openModal)}>
        Thêm dữ liệu
      </button>

      <DataTable columns={columns} data={products} pagination responsive />
    </div>
  );
};

export default Products;

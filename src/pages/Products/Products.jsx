import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import DataTable from "react-data-table-component";
import "../../styles/Row.css";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
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
          console.log(res.data.message);
        });
      axios
        .get(config.API_IP + "/category/getAllCategory", {
          headers: {
            "x-xclient-id": userId,
            authorization: accessToken,
          },
        })
        .then((res) => {
          setCategories(res.data.message.category);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchData();
  }, []);
  const columns = [
    { name: "ID", selector: (row, index) => `#${index + 1}` },
    {
      name: "Ảnh",
      selector: (row) => (
        <img className="row-image" src={row.product_thumb[0]} />
      ),
    },
    {
      name: "Tên sản phẩm",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Giá sản phẩm",
      selector: (row) =>
        row.product_price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),

      sortable: true,
    },
    {
      name: "Số lượng",
      selector: (row) => row.product_quantity,
      sortable: true,
    },
    {
      name: "Đánh giá",
      selector: (row) => (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p>{row.product_ratingAverage}</p>
          <img
            src={require("../../assets/star.png")}
            style={{ width: "20px", height: "20px", marginLeft: "7px" }}
          />
        </div>
      ),
    },
    {
      name: "Trạng thái",
      selector: (row) => <p>{row.isPublished ? "Hiện thị" : "Ẩn"}</p>,
    },

    {
      name: "Action",
      selector: (row) => (
        <Link to={`/products/${row.product_slug}`} state={{ row }}>
          View detail
        </Link>
      ),
    },
  ];
  const customHeader = {
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        backgroundColor: "#e0e0e0",
        border: "1px solid #ddd",
      },
    },
    rows: {
      style: {
        border: "1px solid #000",
      },
    },
    cells: {
      style: {
        border: "1px solid #ddd",
      },
    },
  };
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const result = products.filter((item) => {
      return search.length !== 0
        ? item.product_name.toUpperCase().includes(search.toUpperCase())
        : true;
    });
    setFilteredProducts(result);
  }, [search, products]);
  return (
    <div className="selling">
      <div style={{ marginBottom: "10px" }}>
        <p className="title_page">Sản phẩm</p>
      </div>
      <DataTable
        columns={columns}
        data={filteredProducts}
        pagination
        responsive
        paginationPerPage={6}
        highlightOnHover
        customStyles={customHeader}
        striped
        subHeader
        style={{
          border: "1px solid red",
        }}
        subHeaderComponent={
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",

              alignItems: "center",
            }}
          >
            <div
              style={{ position: "relative", flex: "1", marginLeft: "10px" }}
            >
              <input
                type="text"
                className="search-input"
                form-control
                placeholder="Nhập từ khóa tìm kiếm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <SearchOutlined
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "20px",
                  color: "black",
                }}
              />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Products;

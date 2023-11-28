import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import DataTable from "react-data-table-component";
import "../../styles/Row.css";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [response, setResponse] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const accessToken = localStorage.getItem("accessToken");

        const productPromise = axios.get(config.API_IP + "/admin/product", {
          headers: {
            "x-xclient-id": userId,
            authorization: accessToken,
          },
        });

        const categoryPromise = axios.get(config.API_IP + "/admin/category", {
          headers: {
            "x-xclient-id": userId,
            authorization: accessToken,
          },
        });

        const [productResponse, categoryResponse] = await Promise.all([
          productPromise,
          categoryPromise,
        ]);

        setProducts(productResponse.data.message);
        setCategories(categoryResponse.data.message);
        setResponse(productResponse);

        console.log(productResponse.data.message);
        console.log(categoryResponse.data.message);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { name: "ID", selector: (row, index) => `#${index + 1}` },
    {
      name: "Ảnh",
      selector: (row) => (
        <img className="row-image" src={`uploads/${row.product_thumb[0]}`} />
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
      selector: (row) => (
        <div>
          {row.isPublished ? (
            <p style={{ color: "green" }}>Hiện thị</p>
          ) : (
            <p style={{ color: "red" }}>Ẩn</p>
          )}
        </div>
      ),
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

    cells: {
      style: {
        border: "1px solid #ddd",
      },
    },
  };
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    console.log(selectedCategory);
    const result = products.filter((item) => {
      const categoryMatches =
        selectedCategory.length === 0 ||
        (item.category &&
          item.category._id
            .toUpperCase()
            .includes(selectedCategory.toUpperCase()));

      const nameMatches =
        search.length === 0 ||
        item.product_name.toUpperCase().includes(search.toUpperCase());

      return categoryMatches && nameMatches;
    });
    setFilteredProducts(result);
  }, [search, products, selectedCategory]);

  return (
    <div>
      {response ? (
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
                  style={{
                    position: "relative",
                    flex: "1",
                    marginLeft: "10px",
                  }}
                >
                  <select
                    value={selectedCategory}
                    className="filter-dropdown-select"
                    style={{ marginRight: "30px" }}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>

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
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 30,
                }}
                spin
              />
            }
          />
        </div>
      )}
    </div>
  );
};

export default Products;

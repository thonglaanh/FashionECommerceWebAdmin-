import React, { useEffect, useState } from "react";
import ShopAdd from "./ShopAdd";
import axios from "axios";
import config from "../../config";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import slug from "slugifi";
import "../../styles/Row.css";

const Shop = () => {
  const [openModal, setOpenModal] = useState(false);
  const [shops, setShops] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("accessToken");
      axios
        .get(config.API_IP + "/admin/shop", {
          headers: {
            "x-xclient-id": userId,
            authorization: accessToken,
          },
        })
        .then((res) => {
          console.log(res.data.message);
          setShops(res.data.message);
        });
    };
    fetchData();
  }, []);
  const convertToSlug = (text) => {
    return slug(text, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
  };
  const columns = [
    { name: "ID", sortable: true, selector: (row, index) => `#${index + 1}` },
    {
      name: "Ảnh",
      selector: (row) => <img className="row-image" src={row.avatarShop} />,
      sortable: true,
    },
    {
      name: "Tên cửa hàng",
      selector: (row) => row.nameShop,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => `0${row.phoneNumberShop}`,
      sortable: true,
    },
    {
      name: "Địa chỉ",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <Link
          to={`/shop/${convertToSlug(row.nameShop)}`}
          state={{ row }}
          className="row-action-button"
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
        <ShopAdd openModal={openModal} setOpenModal={setOpenModal} />
      )}
      <p className="title-product">Shops</p>
      <button class="add-button" onClick={() => setOpenModal(!openModal)}>
        Thêm dữ liệu
      </button>

      <DataTable columns={columns} data={shops} pagination responsive />
    </div>
  );
};

export default Shop;

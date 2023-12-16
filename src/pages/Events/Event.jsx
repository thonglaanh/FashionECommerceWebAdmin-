import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import slug from "slugifi";
import DataTable from "react-data-table-component";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { Button, message, Modal } from "antd";

import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import unorm from "unorm";

const Event = () => {
  const [discount, setDiscount] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [search, setSearch] = useState("");
  const [filteredDiscount, setFilteredDiscount] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [response, setResponse] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = () => {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(config.API_IP + "/admin/discount", {
        headers: {
          "x-xclient-id": userId,
          authorization: accessToken,
        },
      })
      .then((res) => {
        console.log(res.data.message);
        setResponse(res);
        setDiscount(res.data.message);
      });
  };

  const AddDiscountModal = ({ open, onCancel }) => {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [value, setValue] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [minValue, setMinValue] = useState(0);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [des, setDes] = useState("");
    const [maxUserPerUses, setMaxUserPerUses] = useState(0);
    const handleSubmit = async () => {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("accessToken");
      if (
        !name ||
        !code ||
        !value ||
        !quantity ||
        !minValue ||
        !start ||
        !end ||
        !des
      ) {
        await messageApi.open({
          type: "warning",
          content: "Vui lòng nhập đủ thông tin!",
        });
        return;
      }
      const formData = {
        name: name,
        code: code,
        value: value,
        max_uses: quantity,
        min_order_value: minValue,
        max_uses_per_user: maxUserPerUses,
        uses_count: 0,
        start_date: start,
        end_date: end,
        des: des,
        applies_to: "all",
      };
      await axios
        .post(`${config.API_IP}/discount`, formData, {
          headers: {
            "x-xclient-id": userId,
            authorization: accessToken,
          },
        })
        .then((res) => {
          messageApi.open({
            type: "success",
            content: "Thêm thành công!",
          });
          fetchData();
          console.log(res);
        })
        .catch((e) => {
          messageApi.open({
            type: "error",
            content: "Thêm thất bại!",
          });

          console.log(e);
        });
    };
    return (
      <Modal
        title="Thêm mã giảm giá"
        open={open}
        onCancel={onCancel}
        onOk={() => handleSubmit()}
      >
        <div className="modal-container">
          <form>
            <label>Tên : </label>
            <input
              type="text"
              placeholder={"Vui lòng nhập tên mã giảm giá"}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Mã code : </label>
            <input
              type="text"
              placeholder={"Vui lòng nhập code mã giảm giá"}
              onChange={(e) => setCode(e.target.value)}
            />
            <label>Giá trị : </label>
            <input
              type="number"
              placeholder={"Vui lòng nhập số tiền giảm"}
              onChange={(e) => setValue(e.target.value)}
            />
            <label>Số lượng : </label>
            <input
              type="number"
              placeholder={"Vui lòng nhập số lượng mã"}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <label>Số lượng dùng tối đa: </label>
            <input
              type="number"
              placeholder={"Vui lòng nhập số lượng mã"}
              onChange={(e) => setMaxUserPerUses(e.target.value)}
            />
            <label>Giá trị tối thiểu : </label>
            <input
              type="number"
              placeholder={"Vui lòng nhập giá trị tối thiểu sử dụng mã"}
              onChange={(e) => setMinValue(e.target.value)}
            />
            <label>Bắt đầu : </label>
            <input type="date" onChange={(e) => setStart(e.target.value)} />
            <label>Kết thúc : </label>
            <input type="date" onChange={(e) => setEnd(e.target.value)} />
            <label>Chi tiết : </label>
            <input
              type="text"
              placeholder={"Vui lòng nhập chi tiết mã giảm giá"}
              onChange={(e) => setDes(e.target.value)}
            />
          </form>
        </div>
      </Modal>
    );
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const columns = [
    { name: "ID", selector: (row, index) => `#${index + 1}` },

    {
      name: "Tên sản phẩm",
      selector: (row) => row.discount_name,
      sortable: true,
    },

    {
      name: "Số lượng",
      selector: (row) => row.discount_code,
      sortable: true,
    },
    {
      name: "Bắt đầu",
      selector: (row) =>
        moment(row.discount_start_date).format("HH:mm:ss DD/MM/YYYY"),
      sortable: true,
    },
    {
      name: "Kết thúc",
      selector: (row) =>
        moment(row.discount_end_date).format("HH:mm:ss DD/MM/YYYY"),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <a
          className="view-detail"
          onClick={() => {
            showModal();
            setSelected(row);
          }}
        >
          View detail
        </a>
      ),
    },
  ];
  const customHeader = {
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        backgroundColor: "#e0e0e0",
      },
    },
    rows: {
      style: {
        border: "1px solid #ddd",
      },
    },
    cells: {
      style: {
        border: "1px solid #ddd",
      },
    },
  };
  useEffect(() => {
    if (discount.length > 0) {
      const normalizedSearchKey = unorm.nfd(search.toLowerCase());
      const result = discount.filter((item) => {
        const normalizedItem = unorm.nfd(item.discount_name.toLowerCase());
        return search.length !== 0
          ? normalizedItem.includes(normalizedSearchKey)
          : true;
      });
      setFilteredDiscount(result);
    }
  }, [search, discount]);
  return (
    <div>
      {response ? (
        <div className="selling">
          {contextHolder}
          <AddDiscountModal
            open={openModal}
            onCancel={() => setOpenModal(false)}
          />
          <p className="title_page">Giảm giá</p>
          <Modal
            title="Thông tin giảm giá"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            style={{ textAlign: "center" }}
            bodyStyle={{
              textAlign: "left",
              marginTop: "20px",
              width: "90vw",
              marginLeft: "10px",
            }}
          >
            {isModalOpen == true ? (
              <div>
                <p>Tên mã giảm giá : {selected.discount_name}</p>
                <p>Mã giảm giá : {selected.discount_code}</p>

                <p>Chi tiết : {selected.discount_des}</p>
                <p>
                  Giảm :{" "}
                  {selected.discount_value.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <p>
                  Giảm cho sản phẩm trên:{" "}
                  {selected.discount_min_order_value.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <p>Số lượng còn lại: {selected.discount_max_uses}</p>
                <p>
                  Bắt đầu :{" "}
                  {moment(selected.discount_start_date).format(
                    "HH:mm:ss DD/MM/YYYY"
                  )}
                </p>
                <p>
                  Kết thúc :{" "}
                  {moment(selected.discount_end_date).format(
                    "HH:mm:ss DD/MM/YYYY"
                  )}
                </p>
                <p>Loại mã : {selected.discount_type}</p>
              </div>
            ) : (
              <div></div>
            )}
          </Modal>

          <DataTable
            columns={columns}
            data={filteredDiscount}
            pagination
            responsive
            paginationPerPage={10}
            highlightOnHover
            customStyles={customHeader}
            striped
            subHeader
            subHeaderComponent={
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "space-between",

                  alignItems: "center",
                }}
              >
                <Button type="primary" onClick={() => setOpenModal(!openModal)}>
                  Thêm giảm giá
                </Button>
                <div
                  style={{
                    position: "relative",
                    flex: "1",
                    marginLeft: "10px",
                  }}
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

export default Event;

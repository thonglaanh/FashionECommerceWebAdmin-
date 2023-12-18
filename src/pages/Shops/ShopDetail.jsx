import React, { useEffect, useState } from "react";
import "../../styles/Detail.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Tabs, Modal, Button, message } from "antd";
import axios from "axios";
import config from "../../config";
import DataTable from "react-data-table-component";
import { Chart } from "react-google-charts";
const { TabPane } = Tabs;

const ShopDetail = () => {
  const location = useLocation();
  const shop = location.state.row;
  const [statistical, setStatistical] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderShop, setOrderShop] = useState([]);

  const [month, setMonth] = useState([]);
  const nav = useNavigate();

  const options = {
    title: "Thống kê doanh thu cửa hàng",
    hAxis: {
      title: "Hàng tháng ",
      titleTextStyle: { color: "#333" },
    },
    vAxis: { minValue: 0 },
    chartArea: { width: "80%", height: "70%" },
  };
  //

  const fetchStatistical = async () => {
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
    console.log(userId);
    console.log(accessToken);
    await axios
      .get(config.API_IP + `/admin/statisticalShop/${shop._id}`, {
        headers: {
          "x-xclient-id": userId,
          authorization: accessToken,
        },
      })
      .then((res) => {
        setStatistical(res.data.message.topProductSold);
        setOrderShop(res.data.message.orderShop);
        const doanhThu = res.data.message.revenue;

        const monthData = doanhThu.map((item) => [
          item.month,
          item.totalRevenue,
        ]);
        setMonth([["Tháng", "Doanh thu"], ...monthData]);

        console.log(res);
      });
  };
  useEffect(() => {
    fetchStatistical();
  }, []);

  const columns = [
    {
      name: "Index",
      selector: (row, index) => `#${index + 1}`,
    },
    {
      name: "Ảnh",
      selector: (row) => (
        <img className="row-image" src={`/uploads/${row.product_thumb[0]}`} />
      ),
    },
    {
      name: "Tên",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Giá",
      selector: (row) =>
        row.product_price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
      sortable: true,
    },
    {
      name: "Đã bán",
      selector: (row) => row.product_sold,
      sortable: true,
    },
    {
      name: "Trạng thái",
      selector: (row) =>
        !row.isPublished ? (
          <p style={{ color: "red" }}>Ẩn</p>
        ) : (
          <p style={{ color: "green" }}>Hiện thị</p>
        ),
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
      sortable: true,
    },
  ];
  const columnsOrder = [
    { name: "ID", selector: (row, index) => `#${index + 1}` },

    {
      name: "SDT khách hàng",
      selector: (row) => `0${row.order_userId[0]?.phoneNumber}`,
      sortable: true,
    },
    {
      name: "Tên cửa hàng",
      selector: (row) => row.order_products[0]?.shopId?.nameShop,
      sortable: true,
    },
    {
      name: "Sản phẩm",
      selector: (row) => row.item_products[0]?.productId?.product_name,
      sortable: true,
    },
    ,
    {
      name: "Tổng tiền",
      selector: (row) =>
        row?.item_products[0]?.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
      sortable: true,
    },
    {
      name: "Trạng thái",
      selector: (row) => (
        <p style={{ color: statusColor(row.order_status) }}>
          {statusText(row.order_status)}
        </p>
      ),
    },

    {
      name: "Action",
      selector: (row) => (
        <Link to={`/order/${row._id}`} state={{ row }}>
          View detail
        </Link>
      ),
    },
  ];
  const handleDisable = async (shop) => {
    const userId = await localStorage.getItem("userId");
    const accessToken = await localStorage.getItem("accessToken");

    await axios
      .put(
        config.API_IP + "/admin/disable/" + shop._id,
        {},
        {
          headers: {
            "x-xclient-id": userId,
            authorization: accessToken,
          },
        }
      )
      .then(async (res) => {
        await messageApi.open({
          type: "success",
          content: "Thành công",
        });
        nav("/shops");
        setIsModalOpen(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const customHeader = {
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        backgroundColor: "#e0e0e0",
      },
    },
    cells: {
      style: {
        border: "1px solid #ddd",
      },
    },
  };

  console.log(shop);
  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "orange";
      case "confirmed":
        return "cyan";
      case "shipped":
        return "blue";
      case "cancelled":
        return "red";
      case "delivered":
        return "green";
      default:
        return "black";
    }
  };
  const statusText = (status) => {
    switch (status) {
      case "pending":
        return "Chưa xác nhận";
      case "confirmed":
        return "Đã xác nhận";
      case "shipped":
        return "Đang giao";
      case "cancelled":
        return "Đã hủy";
      case "delivered":
        return "Đã nhận";
      default:
        return "Không xác định";
    }
  };
  return (
    <div style={{ paddingTop: "30px", height: "100vh" }}>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Chi tiết cửa hàng" key="1">
          {contextHolder}
          <Modal
            title="Vô hiệu hóa"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={() => handleDisable(shop)}
            okButtonProps={{ style: { background: "red", borderColor: "red" } }}
          >
            <p>Bạn có chắc chắn muốn vô hiệu hóa cửa hàng này ?</p>
          </Modal>
          <div className="detail_container">
            <div className="detail_container_image">
              <img
                className="detail_image"
                style={{ height: "65vh" }}
                src={`/${shop.avatarShop}`}
              />
            </div>
            <div className="detail_content">
              <div className="detail_content_customer">
                <p className="detail_title">Thông tin sản phẩm : </p>
                <div>
                  <img src={require("../../assets/shop.png")} />
                  <p>Cửa hàng : </p>
                  <div className="detail_gender">{shop.nameShop}</div>
                </div>

                <div>
                  <img src={require("../../assets/gmail.png")} />
                  <p>Email cửa hàng : </p>
                  <div className="detail_phone">{shop.email}</div>
                </div>
                <div>
                  <img src={require("../../assets/placeholder.png")} />
                  <p>Địa chỉ : </p>
                  <div className="detail_phone">{shop.address}</div>
                </div>
                <div>
                  <img src={require("../../assets/phone-call.png")} />
                  <p>Số điện thoại : </p>
                  <div className="detail_gender">0{shop.phoneNumberShop}</div>
                </div>

                <div>
                  <img src={require("../../assets/three.png")} />
                  <p>Chi tiết : </p>
                  <div className="detail_gender">{shop.des}</div>
                </div>
                <div
                  style={{
                    marginTop: "15px",
                  }}
                >
                  {!shop.disable ? (
                    <button
                      style={{
                        width: "250px",
                        height: "45px",
                        color: "white",
                        border: "1px solid #e0e0e0",
                        backgroundColor: "red",
                      }}
                      onClick={() => setIsModalOpen(true)}
                    >
                      Vô hiệu hóa cửa hàng
                    </button>
                  ) : (
                    <button
                      style={{
                        width: "250px",
                        height: "45px",
                        color: "white",
                        backgroundColor: "gray",
                        border: "none",
                      }}
                      disabled={true}
                    >
                      Cửa hàng đã bị vô hiệu hóa
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Doanh thu" key="2" style={{ paddingTop: "50px" }}>
          <Chart
            chartType="AreaChart"
            width="100%"
            height="400px"
            data={month}
            options={options}
          />
        </TabPane>
        <TabPane tab="Đơn hàng" key="3" style={{ paddingTop: "40px" }}>
          <DataTable
            columns={columnsOrder}
            data={orderShop}
            pagination
            responsive
            paginationPerPage={10}
            highlightOnHover
            customStyles={customHeader}
            striped
          />
        </TabPane>
        <TabPane tab="Danh sách sản phẩm" key="4">
          <DataTable
            columns={columns}
            data={statistical}
            responsive
            pagination
            paginationPerPage={10}
            highlightOnHover
            customStyles={customHeader}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ShopDetail;

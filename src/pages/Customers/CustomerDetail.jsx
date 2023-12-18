import React, { useEffect, useState } from "react";
import "../../styles/Detail.css";
import { Link, useLocation } from "react-router-dom";
import { Spin, Tabs } from "antd";
import { message } from "antd";
import axios from "axios";
import config from "../../config";
import { LoadingOutlined } from "@ant-design/icons";
import DataTable from "react-data-table-component";
import Modal from "antd/es/modal/Modal";

const { TabPane } = Tabs;

const CustomerDetail = () => {
  const location = useLocation();
  const row = location.state.row;

  const [customer, setCustomer] = useState({});
  const [order, setOrder] = useState([]);
  const [response, setResponse] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      const accessToken = localStorage.getItem("accessToken");
      await axios
        .get(`${config.API_IP}/admin/getUser/${row._id}`, {
          headers: {
            "x-xclient-id": userId,
            authorization: accessToken,
          },
        })
        .then((res) => {
          setCustomer(res.data.message.user);
          setResponse(res);
          setOrder(res.data.message?.order);
          setAddress(res.data.message.user?.information?.address);
          console.log(res.data.message.user?.information?.address);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchData();
  }, []);
  const customHeader = {
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        backgroundColor: "#e0e0e0",
        borderBottom: "1px solid #777777",
      },
    },
    cells: {
      style: {
        border: "1px solid #777777",
        borderTop: "none",
      },
    },
  };
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
  const columAdress = [
    { name: "ID", selector: (row, index) => `#${index + 1}` },

    {
      name: "Địa chỉ",
      selector: (row) => `${row.nameAddress}`,
      sortable: true,
    },
    {
      name: "Chi tiết",
      selector: (row) => row.customAddress,
      sortable: true,
    },
  ];
  const columns = [
    { name: "ID", selector: (row, index) => `#${index + 1}` },

    {
      name: "SDT khách hàng",
      selector: (row) => `0${row.order_userId[0].phoneNumber}`,
      sortable: true,
    },
    {
      name: "Tên cửa hàng",
      selector: (row) => row.order_products[0].shopId.nameShop,
      sortable: true,
    },
    {
      name: "Sản phẩm",
      selector: (row) => row.item_products[0].productId.product_name,
      sortable: true,
    },
    {
      name: "Tổng tiền",
      selector: (row) =>
        row.order_checkout.totalPrice.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
      sortable: true,
    },
    {
      name: "Trạng thái",
      selector: (row) => (
        <p style={{ color: statusColor(row.order_status) }}>
          {row.order_status}
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
  const handleDisable = async (customer) => {
    const userId = await localStorage.getItem("userId");
    const accessToken = await localStorage.getItem("accessToken");

    await axios
      .put(
        config.API_IP + "/admin/disable/" + customer._id,
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
        window.location.reload();
        setIsModalOpen(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={{ paddingTop: "30px", height: "100vh" }}>
      {contextHolder}
      <Modal
        title="Vô hiệu hóa"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => handleDisable(customer)}
        okButtonProps={{ style: { background: "red", borderColor: "red" } }}
      >
        <p>Bạn có chắc chắn muốn vô hiệu hóa tài khoản này ?</p>
      </Modal>

      {response ? (
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="Chi tiết khách hàng" key="1">
            <div
              className="detail_container"
              style={{ height: "70vh", padding: "0" }}
            >
              <div className="detail_container_image">
                <img
                  className="detail_image"
                  src={`/${customer?.information?.avatar}`}
                />
              </div>

              <div className="detail_content">
                <div className="detail_content_customer">
                  <p className="detail_title">Thông tin tài khoản : </p>
                  <div>
                    <img src={require("../../assets/signature.png")} />
                    <p>Tên khách hàng : </p>
                    <div className="detail_gender">
                      {customer?.information?.fullName}
                    </div>
                  </div>

                  <div>
                    <img src={require("../../assets/gmail.png")} />
                    <p>Email : </p>
                    <div className="detail_phone">{customer.email}</div>
                  </div>
                  <div>
                    <img src={require("../../assets/phone-call.png")} />
                    <p>Số điện thoại : </p>
                    <div className="detail_gender">
                      {customer?.information?.phoneNumber}
                    </div>
                  </div>
                  <div>
                    <img src={require("../../assets/gender.png")} />
                    <p>Giới tính : </p>
                    <div className="detail_gender">
                      {customer?.information?.gender}
                    </div>
                  </div>

                  <div>
                    <img src={require("../../assets/placeholder.png")} />
                    <p>Địa chỉ : </p>
                  </div>
                  <DataTable
                    columns={columAdress}
                    className="my-box"
                    data={address}
                    responsive
                    highlightOnHover
                    customStyles={customHeader}
                    striped
                  />
                  <div
                    style={{
                      marginTop: "15px",
                    }}
                  >
                    {!customer.disable ? (
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
                        Vô hiệu hóa tài khoản
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
                        Tài khoản đã bị vô hiệu hóa
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Danh sách hóa đơn" key="3">
            <DataTable
              columns={columns}
              className="my-box"
              data={order}
              pagination
              responsive
              paginationPerPage={10}
              highlightOnHover
              customStyles={customHeader}
              striped
            />
          </TabPane>
        </Tabs>
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

export default CustomerDetail;

import React, { useState, useEffect } from "react";
import "../../styles/Login.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import config from "../../config/index";
import axios from "axios";
import { message } from "antd";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        config.API_IP + "/access/login",
        { email: email, password: password, role: "Admin" },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(async (res) => {
        if (res.data.status == 200) {
          localStorage.setItem("userId", res.data.message.userId);
          localStorage.setItem("accessToken", res.data.message.accessToken);
          await messageApi.open({
            type: "success",
            content: "Đăng nhập thành công",
          });
          navigate("/dashbroads");
        } else if (res.data.status == 404) {
          await messageApi.open({
            type: "error",
            content: res.data.error,
          });
        }
      })
      .catch((e) => {
        messageApi.open({
          type: "error",
          content: "Đăng nhập thất bại",
        });
      });
  };
  return (
    <div className="container__login">
      {contextHolder}
      <form className="container__form__login" onSubmit={handleSubmit}>
        <img src={logo} className="logo__login" />
        <p className="title__login">ĐĂNG NHẬP</p>
        <input
          type="email"
          name="user_name"
          onChange={(i) => setEmail(i.target.value)}
          required
          className="form__inp"
          placeholder="Email hoặc Số điện thoại"
        ></input>
        <input
          type="password"
          onChange={(i) => setPassword(i.target.value)}
          name="user_pass"
          required
          className="form__inp"
          placeholder="Mật khẩu"
        ></input>
        <input type="submit" value="Đăng Nhập" className="form__btn" />
      </form>
    </div>
  );
};
export default Login;

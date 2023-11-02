import React, { useState, useEffect } from "react";
import "../../styles/Login.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const navigate = useNavigate();
  const urlLogin = "http://localhost:8080/v1/api/access/login";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(urlLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail, userPassword }),
      });
      // localStorage.setItem('account', JSON.stringify(res.data.account));
      // localStorage.setItem('token', res.data.token);
      toast.success("Đăng nhập thành công!", { position: "top-center" });
      navigate("/dashbroad");
    } catch (error) {
      if (error.res && error.res.status === 402) {
        toast.error("Sai mật khẩu!", { position: "top-center" });
      } else {
        console.log(error);
        toast.error("Email không tồn tại!", { position: "top-center" });
      }
    }
  };
  return (
    <div className="container__login">
      <form className="container__form__login" onSubmit={handleSubmit}>
        <img src={logo} className="logo__login" />
        <p className="title__login">ĐĂNG NHẬP</p>
        <input
          type="email"
          name="user_name"
          onChange={(i) => setUserEmail(i.target.value)}
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

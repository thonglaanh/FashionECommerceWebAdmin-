import React, { useState, useEffect } from "react";
import "../styles/GoToTop.css";
import iconToTop from "../assets/up-arrow.png";

const GoToTop = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > window.innerHeight / 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <img
      src={iconToTop}
      className={`scrollUpButton ${showScrollButton ? "show" : ""}`}
      onClick={scrollToTop}
    ></img>
  );
};

export default GoToTop;

import React, { useEffect } from "react";
import { toast } from "react-toastify"; // Import toast từ react-toastify

function Toast({ message }) {
  useEffect(() => {
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, []);

  return null;
}

export default Toast;

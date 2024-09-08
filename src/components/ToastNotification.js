import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (type, message) => {
        if (type === "success") {
                toast.success(message);
        } else if (type === "error") {
                toast.error(message);
        }
};

const ToastNotifications = () => (
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
);

export default ToastNotifications;

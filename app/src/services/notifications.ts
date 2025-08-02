import toast from "react-hot-toast";

const defaultProps = {
  position: "bottom-left",
};

export const error = (message) => toast.error(message, defaultProps);
export const info = (message) => toast(message, defaultProps);
export const success = (message) => toast.success(message, defaultProps);

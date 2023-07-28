import toast from "react-hot-toast";

export const getReorderedList = (list = []) => {
  return list.map((item, i) => ({
    ...item,
    order: i + 1,
  }));
};

export const getToaster = (content, status) => {
  switch (status) {
    case "success":
      toast.success(content, { duration: 5000 });
      break;
    case "error":
      toast.error(content, { duration: Infinity });
      break;
    case "loading":
      toast.loading(content, { duration: Infinity });
      break;
    default:
      toast(content, { duration: Infinity });
      break;
  }
};

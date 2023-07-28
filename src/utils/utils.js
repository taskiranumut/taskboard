import toast from "react-hot-toast";

export const getReorderedList = (list = []) => {
  return list.map((item, i) => ({
    ...item,
    order: i + 1,
  }));
};

export const moveAndReorderColumns = (
  columns,
  sourceIndex,
  destinationIndex
) => {
  const [removed] = columns.splice(sourceIndex, 1);
  columns.splice(destinationIndex, 0, removed);

  return getReorderedList(columns);
};

export const moveAndReorderTasks = (items, sourceIndex, destinationIndex) => {
  const [removed] = items.splice(sourceIndex, 1);
  items.splice(destinationIndex, 0, removed);
  items = getReorderedList(items);
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

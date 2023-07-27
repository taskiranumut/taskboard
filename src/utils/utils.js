export const getReorderedList = (list = []) => {
  return list.map((item, i) => ({
    ...item,
    order: i + 1,
  }));
};

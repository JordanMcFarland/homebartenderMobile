export const log = (obj, id = "") => {
  console.log(id, JSON.stringify(obj, null, 2));
};

import axios from "axios";

const getData = async () => {
  const response = await axios.get("/products")
debugger
  return response.data.products;
};

export { getData };

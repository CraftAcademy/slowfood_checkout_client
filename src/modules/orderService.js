import axios from "axios";

const createOrder = async (productId) => {
  let authenticationHeaders = JSON.parse(localStorage.getItem("credentials"));
  let response = await axios.post(
    "/orders",
    { product_id: productId },
    { headers: authenticationHeaders }
  );
  return response.data
};;

export { createOrder };

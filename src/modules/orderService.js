import axios from "axios";

let authenticationHeaders = JSON.parse(localStorage.getItem("credentials"));

const createOrder = async (productId) => {
  try {
    let response = await axios.post(
      "/orders",
      { product_id: productId },
      { headers: authenticationHeaders }
    );
    return response.data;
  } catch (error) {
  }
};

const updateOrder = async (orderId, productId) => { 
  let response = await axios.put(
    `/orders/${orderId}`,
    { product_id: productId },
    { headers: authenticationHeaders }
  );
  return response.data;
};

export { createOrder, updateOrder };

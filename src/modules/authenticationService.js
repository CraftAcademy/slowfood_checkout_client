import axios from "axios";

const registerUser = async (credentials) => {
  try {
    let response = await axios.post("/auth", credentials);
    const userCredentials = {
      uid: response.headers["uid"],
      client: response.headers["client"],
      access_token: response.headers["access-token"],
      expiry: response.headers["expiry"],
      token_type: "Bearer",
    };
    localStorage.setItem("credentials", JSON.stringify(userCredentials));
    return response.data.data;
  } catch (error) {
    return error.response.data.errors.full_messages.toString();
  }
};

export { registerUser };

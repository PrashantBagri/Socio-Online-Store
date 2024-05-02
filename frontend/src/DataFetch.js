import axios from "axios";

export const getAllProducts = async () => {
  return axios
    .get("http://localhost:3000/api/v1/products")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Error");
    });
};

export const loginUser = async (data) => {
  return axios
    .post("http://localhost:3000/api/v1/users/login", data, {
      withCredentials:true
    })
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

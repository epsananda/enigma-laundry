import { axiosInstance } from "../../lib/axios";

export const getCustomer = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("nilai token");
    if (!token) {
      throw new Error("No token found");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.get("/customers", {headers});
    dispatch({
      type: "GET_CUSTOMER",
      payload: response.data.data,
    });
  } catch (error) {
    console.log("ERROR FETCHING DATA", error);
  }
};

export const putCustomer = (updatedCustomer) => async (dispatch) => {
  try {
    const token = localStorage.getItem("nilai token");
    if (!token) {
      throw new Error("No token found");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.put("/customers", {headers}, updatedCustomer);
    dispatch({
      type: "PUT_CUSTOMER",
      payload: response.data.data,
    });
  } catch (error) {
    console.log("ERROR UPDATING DATA", error);
  }
};

export const postCustomer = (newCustomer) => async (dispatch) => {
  try {
    const token = localStorage.getItem("nilai token");
    if (!token) {
      throw new Error("No token found");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.post("/customers", {headers}, newCustomer);
    dispatch({
      type: "POST_CUSTOMER",
      payload: response.data.data,
    });
    dispatch(getCustomer());
  } catch (error) {
    console.log("ERROR POSTING DATA", error);
  }
};

export const delCustomer = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("nilai token");
    if (!token) {
      throw new Error("No token found");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.delete(`/customers/${id}`, {headers});
    getCustomer();
    dispatch({
      type: "DEL_CUSTOMER",
      payload: id,
    });
    dispatch(getCustomer());
  } catch (error) {
    console.log("ERROR DELETING DATA", error);
  }
};

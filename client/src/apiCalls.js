import axios from "axios";

export const checkIsAdmin = (token) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/users/isAdmin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const loginUser = (email, password) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
    email: email,
    password: password,
  });
};

export const getUsers = (token) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addUser = (token, data) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/users`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = (token, user_id, userData) => {
  console.log(userData);
  return axios.put(
    `${process.env.REACT_APP_API_URL}/users/${user_id}`,
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getUserAccountDetails = (token, user_id) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/users/${user_id}/account_info`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updatePasswordUser = (token, user_id, data) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/users/password-user/${user_id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updatePasswordAdmin = (token, user_id, data) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/users/password-admin/${user_id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const resetPassword = (data) => {
  console.log(data);
  return axios.put(
    `${process.env.REACT_APP_API_URL}/users/reset/password`,
    data
  );
};

export const getUserAddressDetails = (token, user_id) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/users/${user_id}/account_address`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateUserAccountDetails = (
  token,
  user_id,
  userAccountDetails
) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/users/${user_id}/account_info`,
    userAccountDetails,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateUserAddressDetails = (
  token,
  user_id,
  userAddressDetails
) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/users/${user_id}/account_address`,
    userAddressDetails,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteUser = (token, user_id) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/users/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCartProducts = (token, user_id) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/cart/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addProductsToCart = (token, user_id, cartProducts) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/cart/${user_id}`,
    cartProducts,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteProductsFromCart = (token, user_id) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/cart/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProducts = (token) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addProduct = (token, data) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/products`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = (token, product_id, data) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/products/${product_id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteProduct = (token, product_id) => {
  return axios.delete(
    `${process.env.REACT_APP_API_URL}/products/${product_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getCategories = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/categories`);
};

export const addCategory = (token, data) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/categories`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCategory = (token, category_id, data) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/categories/${category_id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteCategory = (token, category_id) => {
  return axios.delete(
    `${process.env.REACT_APP_API_URL}/categories/${category_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getAllSubcategories = (category) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/subcategories`);
};

export const addSubcategory = (token, data) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/subcategories`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateSubcategory = (token, subcategory_id, data) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/subcategories/${subcategory_id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteSubcategory = (token, subcategory_id) => {
  return axios.delete(
    `${process.env.REACT_APP_API_URL}/subcategories/${subcategory_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createOrder = (orderData) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/orders`, orderData);
};

export const getOrders = (token) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserOrders = (token, id) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const setOrderStatus = (token, id, data) => {
  return axios.put(
    `${process.env.REACT_APP_API_URL}/orders/setstatus/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const { product, quantity } = action.payload;

      const existingProduct = state.products.find(
        (p) => p.product.id === product.id
      );
      if (existingProduct) {
        const updatedProducts = state.products.map((p) =>
          p.product.id === product.id
            ? { ...p, quantity: p.quantity + quantity }
            : p
        );
        return {
          ...state,
          products: updatedProducts,
          quantity: state.quantity,
        };
      } else {
        return {
          ...state,
          products: [
            ...state.products,
            { product, quantity },
          ],
          quantity: state.products.length + 1,
        };
      }
    },
    setProducts: (state, action) => {
      const { products } = action.payload;
      state.products = products;
      state.quantity = products.length;
    },
    updateProductQuantity: (state, action) => {
      const { product, quantity } = action.payload;
      const existingProduct = state.products.find(
        (p) => p.product.id === product.product.id
      );
      if (existingProduct) {
        const updatedProducts = state.products.map((p) =>
          p.product.id === product.product.id
            ? { ...p, quantity: quantity }
            : p
        );

        return {
          ...state,
          products: updatedProducts,

        };
      }

    },
    removeProduct: (state, action) => {
      const { product } = action.payload;
      const updatedProducts = state.products.filter(
        (p) => p.product.id !== product.product.id
      );
    
      return {
        ...state,
        products: updatedProducts,
        quantity: updatedProducts.length,
      };
    },
    removeProducts: (state, action) => {
      state.products = [];
      state.quantity = 0;
    },
  },
});

export const { addProduct, setProducts, updateProductQuantity, removeProduct, removeProducts } = cartSlice.actions;
export default cartSlice.reducer;

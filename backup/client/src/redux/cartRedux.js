import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const { product, quantity, price } = action.payload;

      const existingProduct = state.products.find(
        (p) => p.product.id === product.id
      );
      console.log(existingProduct);
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
          total: state.total + price,
        };
      } else {
        return {
          ...state,
          products: [
            ...state.products,
            { product, quantity },
          ],
          quantity: state.quantity + 1,
          total: state.total + price,
        };
      }
    },
    setProducts: (state, action) => {
      const { products, quantity, total } = action.payload;
      state.products = products;
      state.quantity = quantity;
      state.total = total;
    },
    updateProductQuantity: (state, action) => {
      state.products
    },
  },
});

export const { addProduct, setProducts } = cartSlice.actions;
export default cartSlice.reducer;

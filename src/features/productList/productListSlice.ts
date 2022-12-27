import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { Product } from "./productListTypes";

export interface ProductListState {
  data: Product[];
  status: "idle";
}

const initialState: ProductListState = {
  data: [],
  status: "idle",
};

export const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      state.data.push(action.payload);
    },
    addProductList: (state, action: PayloadAction<Product[]>) => {
      state.data = action.payload;
    },
    deleteProductList: (state) => {
      state.data = [];
    },
  },
});

export const { setProduct, addProductList, deleteProductList } =
  productListSlice.actions;

export const selectProductList = (state: RootState) => state.productList.data;
export const selectProduct = (id: string | undefined) => (state: RootState) => {
  if (!id) {
    console.warn("ID not valid");
    return null;
  }
  const product = state.productList.data.find((product) => product.id === id);
  if (!product) {
    console.warn("Product not found!");
    return null;
  }
  return product;
};

const PRODUCT_LIST = "PRODUCT_LIST";

export const getProductList = (): AppThunk => (dispatch) => {
  const productList = window.localStorage.getItem(PRODUCT_LIST);
  if (!productList) return;
  dispatch(addProductList(JSON.parse(productList)));
};

export const addProduct =
  (partialProduct: Omit<Product, "id">): AppThunk =>
  (dispatch, getState) => {
    const productList = selectProductList(getState());
    const product = { ...partialProduct, id: Date.now().toString() };
    window.localStorage.setItem(
      PRODUCT_LIST,
      JSON.stringify([...productList, product])
    );
    dispatch(setProduct(product));
  };

export const removeProduct =
  (id: string): AppThunk =>
  (dispatch, getState) => {
    const productList = selectProductList(getState());
    const indexToRemove = productList.findIndex((product) => product.id === id);
    if (indexToRemove < 0) {
      console.warn("Element not found!");
      return;
    }
    const newProductArray = [...productList];
    newProductArray.splice(indexToRemove, 1);

    window.localStorage.setItem(PRODUCT_LIST, JSON.stringify(newProductArray));
    dispatch(addProductList(newProductArray));
  };

export const removeProductList = (): AppThunk => (dispatch) => {
  window.localStorage.setItem(PRODUCT_LIST, JSON.stringify([]));
  dispatch(deleteProductList());
};
export const updateProduct =
  (productToUpdate: Product): AppThunk =>
  (dispatch, getState) => {
    const productList = selectProductList(getState());
    const indexToUpdate = productList.findIndex(
      (product) => product.id === productToUpdate.id
    );
    const cloneProductList = [...productList];
    cloneProductList[indexToUpdate] = { ...productToUpdate };
    window.localStorage.setItem(
      PRODUCT_LIST,
      JSON.stringify([...cloneProductList])
    );
    dispatch(addProductList(cloneProductList));
  };

export default productListSlice.reducer;

import productListReducer, {
  setProduct,
  addProductList,
  deleteProductList,
  ProductListState,
} from "./productListSlice";
import { Product } from "./productListTypes";

const mockProduct: Product = {
  id: "12345",
  name: "Test",
  price: 1220,
  description: "Lorem Ipsum",
  category: "Casa",
};

describe("productList reducer", () => {
  const initialState: ProductListState = {
    data: [],
    status: "idle",
  };

  it("should handle initial state", () => {
    expect(productListReducer(undefined, { type: "unknown" })).toEqual({
      data: [],
      status: "idle",
    });
  });

  it("should handle set producy", () => {
    const actual = productListReducer(
      initialState,
      setProduct(mockProduct) as any
    );
    expect(actual.data).toEqual([mockProduct]);
  });

  it("should handle add a product list", () => {
    const finalState: ProductListState = {
      ...initialState,
      data: [{ ...mockProduct }],
    };
    const actual = productListReducer(
      initialState,
      addProductList([{ ...mockProduct }]) as any
    );
    expect(actual).toEqual(finalState);
  });

  it("should handle delete a product list", () => {
    const populatedState: ProductListState = {
      data: [{ ...mockProduct, id: "12345" }],
      status: "idle",
    };

    const actual = productListReducer(
      populatedState,
      deleteProductList() as any
    );
    expect(actual.data).toEqual([]);
  });
});

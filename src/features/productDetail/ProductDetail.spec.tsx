import { fireEvent, getByRole, screen } from "@testing-library/react";
import { ProductDetail } from "./ProductDetail";
import { renderWithProviders } from "../../app/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProductListState } from "../productList/productListSlice";

describe("<ProductDetail>", () => {
  const initialState: ProductListState = {
    data: [
      {
        id: "12345",
        name: "Test",
        category: "Casa",
        price: 50,
        description: "Lorem Ipsum",
      },
    ],
    status: "idle",
  };

  it("renders product values", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/detail/12345"]}>
        <Routes>
          <Route path="detail/:id" element={<ProductDetail />}></Route>
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: { productList: initialState },
      }
    );
    expect(screen.getByText(initialState.data[0].name)).toBeInTheDocument();
    expect(
      screen.getByText(initialState.data[0].description)
    ).toBeInTheDocument();
    expect(screen.getByText(initialState.data[0].category)).toBeInTheDocument();
    expect(screen.getByText(initialState.data[0].price)).toBeInTheDocument();
  });
});

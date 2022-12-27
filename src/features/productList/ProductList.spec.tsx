import { screen } from "@testing-library/react";
import { ProductList } from "./ProductList";
import { renderWithProviders } from "../../app/test-utils";
import { ProductListState } from "./productListSlice";
import { MemoryRouter } from "react-router-dom";

describe("<ProductList>", () => {
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
  it("renders page title message and product", () => {
    renderWithProviders(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>,
      {
        preloadedState: { productList: initialState },
      }
    );
    expect(screen.getByText("Lista dei Prodotti")).toBeInTheDocument();
    expect(screen.getByText("Filtra:")).toBeInTheDocument();
    expect(screen.getByText(initialState.data[0].name)).toBeInTheDocument();
  });
});

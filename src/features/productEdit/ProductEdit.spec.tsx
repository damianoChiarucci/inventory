import { fireEvent, screen } from "@testing-library/react";
import { ProductEdit } from "./ProductEdit";
import { renderWithProviders } from "../../app/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProductListState } from "../productList/productListSlice";

describe("<ProductEdit>", () => {
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
  it("renders product default values", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/edit/12345"]}>
        <Routes>
          <Route path="edit/:id" element={<ProductEdit />}></Route>
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: { productList: initialState },
      }
    );
    expect(
      screen.getByDisplayValue(initialState.data[0].name)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(initialState.data[0].description)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(initialState.data[0].category)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(initialState.data[0].price)
    ).toBeInTheDocument();
  });

  it("renders confirm alert", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/edit/12345"]}>
        <Routes>
          <Route path="edit/:id" element={<ProductEdit />}></Route>
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: { productList: initialState },
      }
    );

    fireEvent.click(screen.getByText("Modifica il prodotto"));

    expect(
      screen.getByText("Il prodotto è stato modificato con successo!")
    ).toBeInTheDocument();
  });
});

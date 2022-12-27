import { screen } from "@testing-library/react";
import { ProductCreation } from "./ProductCreation";
import { renderWithProviders } from "../../app/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProductListState } from "../productList/productListSlice";

describe("<ProductCreation>", () => {
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
  it("renders input labels", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/create"]}>
        <Routes>
          <Route path="/create" element={<ProductCreation />}></Route>
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: { productList: initialState },
      }
    );
    expect(
      screen.getByText("Inserisci il nome del prodotto")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Inserisci una descrizione per il prodotto")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Seleziona la categoria del prodotto")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Inserisci il prezzo del prodotto")
    ).toBeInTheDocument();
  });
});

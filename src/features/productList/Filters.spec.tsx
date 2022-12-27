import React from "react";
import { render, screen, within } from "@testing-library/react";
import { Filters } from "./Filters";
import { FiltersType } from "./filtersType";

describe("<Filters>", () => {
  const filtersMock: FiltersType = {
    text: "Test",
    category: "Tutti",
    priceRange: [0, 100],
  };
  it("renders the correct text value", () => {
    render(
      <Filters
        updateFilters={() => jest.fn()}
        filters={filtersMock}
        maxSliderValue={100}
      />
    );
    const textFilter = screen.getByTestId("filters-text");
    expect(
      within(textFilter).getByDisplayValue(filtersMock.text)
    ).toBeInTheDocument();
  });

  it("renders the correct category", () => {
    render(
      <Filters
        updateFilters={() => jest.fn()}
        filters={filtersMock}
        maxSliderValue={100}
      />
    );
    const categoryFilter = screen.getByTestId("filters-category");
    expect(
      within(categoryFilter).getByDisplayValue(filtersMock.category)
    ).toBeInTheDocument();
  });

  it("render the correct price range", () => {
    render(
      <Filters
        updateFilters={() => jest.fn()}
        filters={filtersMock}
        maxSliderValue={100}
      />
    );
    const priceFilter = screen.getByTestId("filters-price-slider");
    expect(
      within(priceFilter).getByDisplayValue(filtersMock.priceRange[0])
    ).toBeInTheDocument();
    expect(
      within(priceFilter).getByDisplayValue(filtersMock.priceRange[1])
    ).toBeInTheDocument();
  });
});

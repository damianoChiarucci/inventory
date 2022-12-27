import { FiltersType } from "./filtersType";
import { Product } from "./productListTypes";

export const getMaxPriceFromProductList = (productList: Product[]) => {
  if (productList.length < 1) return 0;
  return Math.max(...productList.map((product) => Number(product.price)));
};

export const search = (filters: FiltersType, productList: Product[]) => {
  let filtered = productList.filter((product) => {
    let res = true;
    if (filters.category !== "Tutti" && res) {
      if (product.category === filters.category) {
        res = true;
      } else {
        res = false;
      }
    }

    if (
      res &&
      filters.priceRange[0] <= Number(product.price) &&
      filters.priceRange[1] >= Number(product.price)
    ) {
      res = true;
    } else {
      res = false;
    }

    return res;
  });

  let searchLower: string[] = [];
  if (typeof filters.text === "string" && filters.text.length >= 0) {
    searchLower = filters.text.toLowerCase().split(" ");
  }
  if (searchLower.length > 0) {
    filtered = filtered.filter((elem) => {
      let res = false;
      searchLower.forEach((val) => {
        if (elem.name.toLowerCase().includes(val)) {
          res = true;
        }
        if (elem.description.toLowerCase().includes(val)) {
          res = true;
        }
        return res;
      });

      return res;
    });
  }
  return filtered;
};

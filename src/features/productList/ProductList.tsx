import {
  Alert,
  AlertTitle,
  Divider,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeProduct, selectProductList } from "./productListSlice";
import { Filters } from "./Filters";
import { FiltersType } from "./filtersType";
import { useEffect, useMemo, useState } from "react";
import { getMaxPriceFromProductList, search } from "./filtersUtils";
import { Product } from "./productListTypes";

const DEFAULT_FILTERS: FiltersType = {
  text: "",
  category: "Tutti",
  priceRange: [0, 0],
};

export const ProductList = () => {
  const dispatch = useAppDispatch();
  const productList = useAppSelector(selectProductList);

  const [filters, setFilters] = useState<FiltersType>(DEFAULT_FILTERS);

  const [filteredProductList, setFilteredProductList] =
    useState<Product[]>(productList);

  useEffect(() => {
    const filteredPL = search(filters, productList);
    setFilteredProductList(filteredPL);
  }, [productList, filters]);

  const maxSliderValue = useMemo(
    () => getMaxPriceFromProductList(productList),
    [productList]
  );
  useEffect(() => {
    setFilters((f) => ({
      ...f,
      priceRange: [0, maxSliderValue],
    }));
  }, [maxSliderValue]);

  const handleRemove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    dispatch(removeProduct(id));
  };
  const updateFilters = (updatedFilters: FiltersType) => {
    setFilters(updatedFilters);
  };
  return (
    <Container maxWidth="sm">
      <Filters
        filters={filters}
        updateFilters={updateFilters}
        maxSliderValue={maxSliderValue}
      />
      <Divider sx={{ marginY: "18px" }} />
      <Typography align="left" sx={{ fontWeight: 600, marginBottom: "8px" }}>
        Lista dei Prodotti
      </Typography>

      {filteredProductList.length === 0 ? (
        <Alert severity="info">
          <AlertTitle>Non ci sono prodotti disponibili</AlertTitle>
          {productList.length > 0
            ? "Cambia i parametri della tua ricerca"
            : "Aggiungi prodotti alla tua lista"}
        </Alert>
      ) : (
        <List>
          {filteredProductList.map((product) => (
            <Link
              key={product.id}
              to={`/detail/${product.id}`}
              style={{ textDecoration: "none", color: "#333" }}
            >
              <ListItemButton>
                <ListItemText>{product.name}</ListItemText>
                <Button
                  type="button"
                  onClick={(e) => handleRemove(e, product.id)}
                >
                  <DeleteIcon />
                </Button>
              </ListItemButton>
              <Divider />
            </Link>
          ))}
        </List>
      )}
    </Container>
  );
};

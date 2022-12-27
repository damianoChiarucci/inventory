import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { isCategory, Product } from "../features/productList/productListTypes";

interface ProducFormProps {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    product: Omit<Product, "id">
  ) => void;
  initialProduct?: Omit<Product, "id">;
}
export const ProductForm: React.FC<ProducFormProps> = ({
  handleSubmit,
  initialProduct = {
    name: "",
    category: "Svago",
    price: 0,
    description: "",
  },
}) => {
  const [product, setProduct] = useState<Omit<Product, "id">>(initialProduct);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setProduct({ ...product, [id]: value });
  };
  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isCategory(event.target.value)) return;
    setProduct({ ...product, category: event.target.value });
  };
  return (
    <form id="product-creation-form" onSubmit={(e) => handleSubmit(e, product)}>
      <TextField
        id="name"
        fullWidth
        margin="normal"
        required
        aria-describedby="name-helper-text"
        onChange={handleChange}
        value={product.name}
        helperText="Inserisci il nome del prodotto"
      />
      <TextField
        id="category"
        select
        fullWidth
        margin="normal"
        required
        value={product.category}
        onChange={handleSelect}
        helperText="Seleziona la categoria del prodotto"
      >
        <MenuItem value="Svago">Svago</MenuItem>
        <MenuItem value="Ufficio">Ufficio</MenuItem>
        <MenuItem value="Casa">Casa</MenuItem>
      </TextField>
      <TextField
        id="price"
        fullWidth
        required
        margin="normal"
        aria-describedby="price-helper-text"
        onChange={handleChange}
        value={Number(product.price).toString()}
        type="number"
        helperText="Inserisci il prezzo del prodotto"
      />
      <TextField
        id="description"
        fullWidth
        required
        margin="normal"
        value={product.description}
        aria-describedby="description-helper-text"
        onChange={handleChange}
        type="text"
        helperText="Inserisci una descrizione per il prodotto"
      />
      <Button fullWidth variant="contained" type="submit">
        {initialProduct.name ? "Modifica il prodotto" : "Aggiungi il prodotto"}
      </Button>
    </form>
  );
};

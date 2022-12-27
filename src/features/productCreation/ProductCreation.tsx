import React, { useState } from "react";
import Container from "@mui/material/Container";
import { useAppDispatch } from "../../app/hooks";
import { addProduct } from "../productList/productListSlice";
import { Product } from "../productList/productListTypes";
import Button from "@mui/material/Button";
import { ProductForm } from "../../components/ProductForm";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { useNavigate } from "react-router-dom";

export const ProductCreation: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    product: Omit<Product, "id">
  ) => {
    event.preventDefault();
    dispatch(addProduct(product));
    setOpen(true);
  };

  return (
    <Container maxWidth="sm">
      <ProductForm handleSubmit={handleSubmit} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Il prodotto è stato aggiunto con successo!
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Vai alla lista
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

import React, { useState } from "react";
import Container from "@mui/material/Container";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectProduct, updateProduct } from "../productList/productListSlice";
import { Product } from "../productList/productListTypes";
import Button from "@mui/material/Button";
import { ProductForm } from "../../components/ProductForm";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

export const ProductEdit: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const productToEdit = useAppSelector(selectProduct(id));
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    navigate(`/detail/${id}`);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    product: Omit<Product, "id">
  ) => {
    event.preventDefault();
    if (!productToEdit) return;
    dispatch(updateProduct({ ...product, id: productToEdit.id }));
    setOpen(true);
  };
  if (!productToEdit) return <Navigate to="/" replace />;
  return (
    <Container maxWidth="sm">
      <ProductForm handleSubmit={handleSubmit} initialProduct={productToEdit} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Il prodotto è stato modificato con successo!
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Vai al dettaglio del prodotto
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

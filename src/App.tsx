import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { ProductDetail } from "./features/productDetail/ProductDetail";
import { ProductCreation } from "./features/productCreation/ProductCreation";
import { ProductEdit } from "./features/productEdit/ProductEdit";
import { ProductList } from "./features/productList/ProductList";
import { getProductList } from "./features/productList/productListSlice";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProductList());
  }, []);
  return (
    <Router>
      <Container maxWidth="sm">
        <Box padding="10px" marginBottom="10px">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button>Home</Button>
          </Link>
          <Link to="/create" style={{ textDecoration: "none" }}>
            <Button>Aggiungi</Button>
          </Link>
        </Box>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="detail/:id" element={<ProductDetail />} />
          <Route path="edit/:id" element={<ProductEdit />} />
          <Route path="create" element={<ProductCreation />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;

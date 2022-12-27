import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router";
import { Link, Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectProduct } from "../productList/productListSlice";

export const ProductDetail = () => {
  const { id } = useParams();
  console.log(id);
  const product = useAppSelector(selectProduct(id));

  if (!product) return <Navigate to="/" replace={true} />;

  return (
    <Container maxWidth="sm">
      <Typography align="center">Dettagli del prodotto</Typography>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {product.category}
          </Typography>
          <Typography variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {product.price}
          </Typography>
          <Typography variant="body2">{product.description}</Typography>
        </CardContent>
        <CardActions>
          <Link to={`/edit/${product.id}`}>
            <Button size="small">Modifica</Button>
          </Link>
        </CardActions>
      </Card>
    </Container>
  );
};

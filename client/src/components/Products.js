import "./Products.css";
import Product from "./Product";
import { popularProducts } from "../data";

const Products = ({item}) => {
  return (
    <div className="products_container">
      {popularProducts.map((item) => (
        <Product item={item}  key={item.id}/>
      ))}
    </div>
  );
};

export default Products;

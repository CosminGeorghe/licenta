import "./Products.css";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";

const Products = ({ category, filter, sort, productsPerPage }) => {

  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      axios
        .get(
          category !== undefined
            ? `http://localhost:5000/api/products?category=${category}`
            : "http://localhost:5000/api/products"
        )
        .then((res) => {
          setProducts(res.data.data);
          setFilteredProducts(res.data.data);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    };
    getProducts();
    setLoading(false);
  }, [category]);

  useEffect(() => {
    if (category !== undefined) {
      if (Number(filter) !== 0) {
        setFilteredProducts(
          products.filter((item) => item.subcategory_id === filter)
        );
      } else {
        setFilteredProducts(products);
      }
    }
  }, [products, category, filter]);

  useEffect(() => {
    if (sort === "nou") {
      setFilteredProducts((prev) =>
        [...prev].sort(function (a, b) {
          if (a.id > b.id) {
            return -1;
          } else if (a.id < b.id) {
            return 1;
          }
          return 0;
        })
      );
    }
    if (sort === "nume_asc") {
      setFilteredProducts((prev) =>
        [...prev].sort(function (a, b) {
          if (a.title < b.title) {
            return -1;
          } else if (a.title > b.title) {
            return 1;
          }
          return 0;
        })
      );
    }
    if (sort === "nume_desc") {
      setFilteredProducts((prev) =>
        [...prev].sort(function (a, b) {
          if (a.title > b.title) {
            return -1;
          } else if (a.title < b.title) {
            return 1;
          }
          return 0;
        })
      );
    }
    if (sort === "pret_asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    }
    if (sort === "pret_desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [products, category, sort]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(products);
  return (
    <div className="products_container">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => <Product product={product} key={product.id} />)
      ) : (
        <div>Nu am gasit nici un produs</div>
      )}
    </div>
  );
};

export default Products;

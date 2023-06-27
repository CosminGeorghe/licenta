import { useLocation } from "react-router-dom";
import "./index.css";
import Products from "../../components/Products";
import { useEffect, useState } from "react";
import axios from "axios";
import { categories } from "../../data";

const ProductList = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [isLoading, setLoading] = useState(true);
  const [filter, setFilter] = useState("0");
  const [sort, setSort] = useState("nou");
  const [productsPerPage, setProductsPerPage] = useState("25");
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const getProducts = () => {
      axios
        .get(
          category != undefined
            ? `http://localhost:5000/api/products?category=${category}`
            : "http://localhost:5000/api/products"
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    };
    const getSubcategories = () => {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/subcategories?category=${category}`
        )
        .then((res) => {
          setSubcategories(res.data.data);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    };
    getProducts();
    getSubcategories();
    setLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product_list_container">
      <h1 className="product_list_title">{category}</h1>
      <div className="product_list_sort_container">
        <div className="product_list_sort">
          <span className="product_sort_text">Sort products:</span>
          <select
            onChange={(e) => setSort(e.target.value)}
            className="product_select"
          >
            <option value="nou" className="product_option">
              Cele mai noi
            </option>
            <option value="nume_asc" className="product_option">
              Nume (A-Z)
            </option>
            <option value="nume_desc" className="product_option">
              Nume (Z-A)
            </option>
            <option value="pret_asc" className="product_option">
              Pret (Mic {">"} Mare)
            </option>
            <option value="pret_desc" className="product_option">
              Pret (Mare {">"} Mic)
            </option>
          </select>
          <span className="product_sort_text">Filter by category:</span>
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="product_select"
          >
            <option value="0" className="product_option">
              Toate
            </option>
            {subcategories.map((item) => (
              <option value={item.id} className="product_option">
                {item.subcategory}
              </option>
            ))}
          </select>
        </div>
        <div className="product_list_sort">
          <span className="product_sort_text">
            Number of products per page:
          </span>
          <select
            onChange={(e) => setProductsPerPage(e.target.value)}
            className="product_select"
          >
            <option className="product_option">25</option>
            <option className="product_option">50</option>
            <option className="product_option">75</option>
            <option className="product_option">100</option>
          </select>
        </div>
      </div>
      <Products
        category={category}
        filter={filter}
        sort={sort}
        productsPerPage={productsPerPage}
      />
    </div>
  );
};

export default ProductList;

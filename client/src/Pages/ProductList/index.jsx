import { useLocation } from "react-router-dom";
import "./index.css";
import Products from "../../components/Products";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");
  const allProducts = searchParams.get("allproducts");
  const [isLoading, setLoading] = useState(true);
  const [filter, setFilter] = useState("0");
  const [sort, setSort] = useState("nou");
  const [productsPerPage, setProductsPerPage] = useState("25");
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
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
    getSubcategories();
    setLoading(false);
  }, [category]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product_list_container">
      {category && (
        <h1 className="product_list_title">Categoria curenta: {category}</h1>
      )}
      <div className="product_list_sort_container">
        <div className="product_list_sort">
          <span className="product_sort_text">Sorteaza produse:</span>
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
          <span className="product_sort_text">Filtreaza dupa categorie:</span>
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
        {false && (
          <div className="product_list_sort">
            <span className="product_sort_text">
              Numarul produselor pe pagina:
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
        )}
      </div>
      <Products
        category={category}
        searchQuery={searchQuery}
        allProducts={allProducts}
        filter={filter}
        sort={sort}
        productsPerPage={productsPerPage}
      />
    </div>
  );
};

export default ProductList;

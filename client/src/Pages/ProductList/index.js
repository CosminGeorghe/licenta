import "./index.css";
import Products from "../../components/Products";

const ProductList = () => {
  return (
    <div className="product_list_container">
      <h1 className="product_list_title">Dogs</h1>
      <div className="product_list_sort_container">
        <div className="product_list_sort">
          <span className="product_sort_text">Sort products:</span>
          <select className="product_select">
            <option className="product_option">Nume (A-Z)</option>
            <option className="product_option">Nume (Z-A)</option>
            <option className="product_option">Pret (Mic > Mare)</option>
            <option className="product_option">Pret (Mare > Mic)</option>
          </select>
        </div>
        <div className="product_list_sort">
          <span className="product_sort_text">
            Number of products per page:
          </span>
          <select className="product_select">
            <option className="product_option">25</option>
            <option className="product_option">50</option>
            <option className="product_option">75</option>
            <option className="product_option">100</option>
          </select>
        </div>
      </div>
      <Products />
    </div>
  );
};

export default ProductList;

import React, { useEffect, useState } from "react";
import "./ExpandableProduct.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  deleteProduct,
  getCategories,
  getAllSubcategories,
  updateProduct,
} from "../../apiCalls";
import { useSelector } from "react-redux";

const ExpandableProduct = ({ product, fetchProducts }) => {
  const [expanded, setExpanded] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [categories, setCategories] = useState();
  const [subcategories, setSubcategories] = useState([]);
  const [thisCategorySubcategories, setThisCategorySubcategories] = useState(
    []
  );
  const [productCategory, setProductCategory] = useState([]);
  const [productSubcategory, setProductSubategory] = useState();
  const reduxUser = useSelector((state) => state.user);
  const logedInUser = useSelector((state) => state.user);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const fetchCategoriesAndSubcategories = async () => {
    try {
      const response1 = await getCategories();
      const data1 = response1.data.data;
      const receivedCategories = data1;
      const response2 = await getAllSubcategories();
      const data2 = response2.data.data;
      const receivedSubCategories = data2;
      const subcategory = receivedSubCategories.find(
        (subcategory) => subcategory.id === product.subcategory_id
      );
      const category = receivedCategories.find(
        (category) => category.id === subcategory.category_id
      );

      const subcategoriesOfThisCategory = receivedSubCategories.filter(
        (subcategory) => subcategory.category_id === category.id
      );
      setThisCategorySubcategories(subcategoriesOfThisCategory);
      setCategories(data1);
      setSubcategories(data2);
      setProductSubategory(subcategory);
      setProductCategory(category);
    } catch (error) {
      console.log(error.message);
    } finally {
    }
  };

  const updateCurrentSubcategories = (category_id) => {
    const subcategoriesOfThisCategory = subcategories.filter(
      (subcategory) => Number(subcategory.category_id) === Number(category_id)
    );
    setThisCategorySubcategories(subcategoriesOfThisCategory);
    setUpdatedProduct((prevState) => ({
      ...prevState,
      subcategory_id: subcategoriesOfThisCategory[0].id,
    }));
  };

  useEffect(() => {
    fetchCategoriesAndSubcategories();
  }, [logedInUser.token]);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    console.log(updatedProduct.desc);
    await updateProduct(reduxUser.token, updatedProduct.id, updatedProduct);
    await fetchProducts();
  };

  const handleResetProduct = (e) => {
    e.preventDefault();
    setUpdatedProduct(product);
  };

  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    await deleteProduct(reduxUser.token, updatedProduct.id);
    await fetchProducts();
  };

  const notExpandedContent = (
    <div className="product_not-expanded_container">
      <p className="product_not-expanded_container_item">
        title: {product.title}
      </p>
      <button
        onClick={toggleExpand}
        className="product_not-expanded_expand_btn"
      >
        <KeyboardArrowDownIcon />
      </button>
    </div>
  );

  const expandedContent = (
    <form className="product_expanded_container">
      <button onClick={toggleExpand} className="product_expanded_expand_btn">
        <KeyboardArrowUpIcon />
      </button>
      <div className="product_expanded_label_input_container">
        <label htmlFor="title" className="product_expanded_label">
          Titlu:
        </label>
        <input
          value={updatedProduct.title}
          onChange={(e) =>
            setUpdatedProduct((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
          id="title"
          name="title"
          className="product_expanded_input"
        ></input>
      </div>
      <div className="product_expanded_label_input_container">
        <label htmlFor="desc" className="product_expanded_label">
          Descriere:
        </label>
        <textarea
          value={updatedProduct.desc}
          onChange={(e) =>
            setUpdatedProduct((prevState) => ({
              ...prevState,
              desc: e.target.value,
            }))
          }
          id="desc"
          name="desc"
          rows="10"
          cols="50"
          className="product_expanded_input"
        ></textarea>
      </div>
      <div className="product_expanded_label_input_container">
        <label htmlFor="img" className="product_expanded_label">
          Imagine:
        </label>
        <input
          value={updatedProduct.img}
          onChange={(e) =>
            setUpdatedProduct((prevState) => ({
              ...prevState,
              img: e.target.value,
            }))
          }
          id="img"
          name="img"
          className="product_expanded_input"
        ></input>
      </div>
      <div className="product_expanded_label_input_container">
        <label htmlFor="price" className="product_expanded_label">
          Pret:
        </label>
        <input
          value={updatedProduct.price}
          onChange={(e) =>
            setUpdatedProduct((prevState) => ({
              ...prevState,
              price: e.target.value,
            }))
          }
          id="price"
          name="price"
          className="product_expanded_input"
        ></input>
      </div>
      <div className="product_expanded_label_input_container">
        <label htmlFor="category" className="product_expanded_label">
          Categorie:
        </label>
        <select
          name="category"
          id="category"
          className="product_expanded_input"
          onChange={(e) => updateCurrentSubcategories(e.target.value)}
        >
          {categories &&
            categories.map((category) => (
              <option
                value={category.id}
                selected={category.id === productCategory.id}
              >
                {category.title}
              </option>
            ))}
        </select>
      </div>
      <div className="product_expanded_label_input_container">
        <label htmlFor="subcategory" className="product_expanded_label">
          Subategorie:
        </label>
        <select
          name="subcategory"
          id="subcategory"
          className="product_expanded_input"
          onChange={(e) =>
            setUpdatedProduct((prevState) => ({
              ...prevState,
              subcategory_id: e.target.value,
            }))
          }
        >
          {thisCategorySubcategories &&
            thisCategorySubcategories.map((subcategory) => (
              <option
                value={subcategory.id}
                selected={subcategory.id === productSubcategory.id}
              >
                {subcategory.subcategory}
              </option>
            ))}
        </select>
      </div>
      <div>
        <button
          type="submit"
          onClick={handleUpdateProduct}
          className="product_expanded_confirm_btn"
        >
          Actualizeaza Produsul
        </button>
        <button
          type="submit"
          onClick={handleResetProduct}
          className="product_expanded_reset_btn"
        >
          Reseteaza valorile
        </button>
        <button
          type="submit"
          onClick={handleDeleteProduct}
          className="product_expanded_delete_btn"
        >
          Sterge Produsul
        </button>
      </div>
    </form>
  );
  return (
    <div className="expandableuser_container">
      <div></div>
      {expanded ? expandedContent : notExpandedContent}
    </div>
  );
};

export default ExpandableProduct;

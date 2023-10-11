import "./ExpandableCategory.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  deleteCategory,
  getAllSubcategories,
  updateCategory,
} from "../../apiCalls";

const ExpandableCategory = ({ category, fetchCategories }) => {
  const [expanded, setExpanded] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState(category);
  const reduxUser = useSelector((state) => state.user);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    await updateCategory(reduxUser.token, updatedCategory.id, updatedCategory);
    await fetchCategories();
  };

  const handleResetCategory = (e) => {
    e.preventDefault();
    setUpdatedCategory(category);
  };

  const handleDeleteCategory = async (e) => {
    e.preventDefault();
    await deleteCategory(reduxUser.token, updatedCategory.id);
    await fetchCategories();
  };

  const notExpandedContent = (
    <div className="category_not-expanded_container">
      <p className="category_not-expanded_container_item">
        category: {category.title}
      </p>
      <button
        onClick={toggleExpand}
        className="category_not-expanded_expand_btn"
      >
        <KeyboardArrowDownIcon />
      </button>
    </div>
  );

  const expandedContent = (
    <form className="category_expanded_container">
      <button onClick={toggleExpand} className="category_expanded_expand_btn">
        <KeyboardArrowUpIcon />
      </button>
      <div className="category_expanded_label_input_container">
        <label htmlFor="title" className="category_expanded_label">
          Titlu:
        </label>
        <input
          value={updatedCategory.title}
          onChange={(e) =>
            setUpdatedCategory((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
          id="title"
          name="title"
          className="category_expanded_input"
        ></input>
      </div>
      <div className="category_expanded_label_input_container">
        <label htmlFor="img" className="category_expanded_label">
          Imagine:
        </label>
        <input
          value={updatedCategory.img}
          onChange={(e) =>
            setUpdatedCategory((prevState) => ({
              ...prevState,
              img: e.target.value,
            }))
          }
          id="img"
          name="img"
          className="category_expanded_input"
        ></input>
      </div>
      <div className="category_expanded_label_input_container">
        <label htmlFor="category" className="category_expanded_label">
          Categorie:
        </label>
        <input
          value={updatedCategory.category}
          onChange={(e) =>
            setUpdatedCategory((prevState) => ({
              ...prevState,
              category: e.target.value,
            }))
          }
          id="category"
          name="category"
          className="category_expanded_input"
        ></input>
      </div>
      <div>
        <button
          type="submit"
          onClick={handleUpdateCategory}
          className="category_expanded_confirm_btn"
        >
          Actualizeaza Categoria
        </button>
        <button
          type="submit"
          onClick={handleResetCategory}
          className="category_expanded_reset_btn"
        >
          Reseteaza valorile
        </button>
        <button
          type="submit"
          onClick={handleDeleteCategory}
          className="category_expanded_delete_btn"
        >
          Sterge Categoria
        </button>
      </div>
    </form>
  );

  return (
    <div className="expandablecategory_container">
      <div></div>
      {expanded ? expandedContent : notExpandedContent}
    </div>
  );
};

export default ExpandableCategory;

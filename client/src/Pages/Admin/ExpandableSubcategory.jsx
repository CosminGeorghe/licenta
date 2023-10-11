import "./ExpandableSubcategory.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  deleteSubcategory,
  getCategories,
  updateSubcategory,
} from "../../apiCalls";

const ExpandableSubategory = ({ subcategory, fetchSubcategories }) => {
  const [expanded, setExpanded] = useState(false);
  const [updatedSubcategory, setUpdatedSubcategory] = useState(subcategory);
  const [categories, setCategories] = useState([]);
  const logedInUser = useSelector((state) => state.user);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories(logedInUser.token);
      const data = response.data.data;
      setCategories(data);
    } catch (error) {
      console.log(error.message);
    } finally {
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [logedInUser.token]);

  const handleUpdateSubcategory = async (e) => {
    e.preventDefault();
    await updateSubcategory(
      logedInUser.token,
      updatedSubcategory.id,
      updatedSubcategory
    );
    await fetchSubcategories();
  };

  const handleResetSubcategory = (e) => {
    e.preventDefault();
    setUpdatedSubcategory(subcategory);
  };

  const handleDeleteSubcategory = async (e) => {
    e.preventDefault();
    await deleteSubcategory(logedInUser.token, updatedSubcategory.id);
    await fetchSubcategories();
  };

  const notExpandedContent = (
    <div className="subcategory_not-expanded_container">
      <p className="subcategory_not-expanded_container_item">
        subcategorie: {subcategory.subcategory}
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
    <form className="subcategory_expanded_container">
      <button onClick={toggleExpand} className="subcategory_expanded_expand_btn">
        <KeyboardArrowUpIcon />
      </button>
      <div className="subcategory_expanded_label_input_container">
        <label htmlFor="subcategory" className="subcategory_expanded_label">
          Subcategorie:
        </label>
        <input
          value={updatedSubcategory.subcategory}
          onChange={(e) =>
            setUpdatedSubcategory((prevState) => ({
              ...prevState,
              subcategory: e.target.value,
            }))
          }
          id="subcategory"
          name="subcategory"
          className="subcategory_expanded_input"
        ></input>
      </div>
      <div className="subcategory_expanded_label_input_container">
        <label htmlFor="category" className="subcategory_expanded_label">
          Categorie:
        </label>
        <select
          name="category"
          id="category"
          className="subcategories_input"
          onChange={(e) =>
            setUpdatedSubcategory((prevState) => ({
              ...prevState,
              category_id: e.target.value,
            }))
          }
        >
          {categories &&
            categories.map((category) => (
              <option
                value={category.id}
                selected={updatedSubcategory.category_id === category.id}
              >
                {category.title}
              </option>
            ))}
        </select>
      </div>
      <div>
        <button
          type="submit"
          onClick={handleUpdateSubcategory}
          className="subcategory_expanded_confirm_btn"
        >
          Actualizeaza Subcategoria
        </button>
        <button
          type="submit"
          onClick={handleResetSubcategory}
          className="subcategory_expanded_reset_btn"
        >
          Reseteaza valorile
        </button>
        <button
          type="submit"
          onClick={handleDeleteSubcategory}
          className="subcategory_expanded_delete_btn"
        >
          Sterge Subcategoria
        </button>
      </div>
    </form>
  );

  return (
    <div className="expandablesubcategory_container">
      <div></div>
      {expanded ? expandedContent : notExpandedContent}
    </div>
  );
};

export default ExpandableSubategory;

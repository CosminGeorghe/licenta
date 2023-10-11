import { useEffect, useState } from "react";
import ExpandableSubcategory from "./ExpandableSubcategory";
import "./Subcategories.css";
import { useSelector } from "react-redux";
import {
  addSubcategory,
  getAllSubcategories,
  getCategories,
} from "../../apiCalls";

const Subcategories = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [axiosError, setAxiosError] = useState([]);
  const reduxUser = useSelector((state) => state.user);
  const [newSubcategory, setNewSubcategory] = useState({
    subcategory: "",
    category_id: "",
  });
  const logedInUser = useSelector((state) => state.user);

  const fetchSubcategories = async () => {
    try {
      setLoading(true);
      const response = await getAllSubcategories(logedInUser.token);
      const data = response.data.data;
      setSubcategories(data);
      setNewSubcategory((prevState) => ({
        ...prevState,
        category_id: data[0].category_id,
      }));
    } catch (error) {
      setAxiosError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategories(logedInUser.token);
      const data = response.data.data;
      setCategories(data);
    } catch (error) {
      setAxiosError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, [logedInUser.token]);

  const handleAddSubcategory = async (e) => {
    e.preventDefault();
    await addSubcategory(reduxUser.token, newSubcategory);
    await fetchSubcategories();
  };

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          {
            <div className="subcategories_add_container">
              <h2>Adauga subcategorie</h2>
              <form className="subcategories_add_form">
                <div className="subcategories_input_container">
                  <label htmlFor="subcategory" className="subcategories_label">
                    Subcategorie:
                  </label>
                  <input
                    value={newSubcategory.subcategory}
                    onChange={(e) =>
                      setNewSubcategory((prevState) => ({
                        ...prevState,
                        subcategory: e.target.value,
                      }))
                    }
                    id="subcategory"
                    name="subcategory"
                    className="subcategories_input"
                  ></input>
                </div>
                <div className="subcategories_input_container">
                  <label htmlFor="category" className="subcategories_label">
                    Categorie:
                  </label>
                  <select
                    name="category"
                    id="category"
                    className="subcategories_input"
                    onChange={(e) =>
                      setNewSubcategory((prevState) => ({
                        ...prevState,
                        category_id: e.target.value,
                      }))
                    }
                  >
                    {categories &&
                      categories.map((category, index) => (
                        <option
                          key={category.id}
                          value={category.id}
                          selected={index === 0}
                        >
                          {category.title}
                        </option>
                      ))}
                  </select>
                </div>
                <button
                  type="submit"
                  onClick={handleAddSubcategory}
                  className="subcategories_confirm_btn"
                >
                  Adauga subcategorie
                </button>
              </form>
            </div>
          }
          {subcategories.map((subcategory) => (
            <ExpandableSubcategory
              key={subcategory.id}
              subcategory={subcategory}
              fetchSubcategories={fetchSubcategories}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Subcategories;

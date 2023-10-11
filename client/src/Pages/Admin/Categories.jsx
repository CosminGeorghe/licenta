import { useEffect, useState } from "react";
import ExpandableCategory from "./ExpandableCategory";
import "./Categories.css";
import { useSelector } from "react-redux";
import { addCategory, getCategories } from "../../apiCalls";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [axiosError, setAxiosError] = useState([]);
  const reduxUser = useSelector((state) => state.user);
  const [newCategory, setNewCategory] = useState({
    category: "",
    img: "",
    title: "",
  });
  const logedInUser = useSelector((state) => state.user);

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
    fetchCategories();
  }, [logedInUser.token]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    console.log(newCategory);
    await addCategory(reduxUser.token, newCategory);
    await fetchCategories();
  }

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          {
            <div className="categories_add_container">
              <h2>Adauga categorie</h2>
              <form className="categories_add_form">
                <div className="categories_input_container">
                  <label htmlFor="title" className="categories_label">
                    Titlu:
                  </label>
                  <input
                    value={newCategory.title}
                    onChange={(e) =>
                      setNewCategory((prevState) => ({
                        ...prevState,
                        title: e.target.value,
                      }))
                    }
                    id="title"
                    name="title"
                    className="categories_input"
                  ></input>
                </div>
                <div className="categories_input_container">
                  <label htmlFor="img" className="categories_label">
                    Imagine:
                  </label>
                  <input
                    value={newCategory.img}
                    onChange={(e) =>
                      setNewCategory((prevState) => ({
                        ...prevState,
                        img: e.target.value,
                      }))
                    }
                    id="img"
                    name="img"
                    className="categories_input"
                  ></input>
                </div>
                <div className="categories_input_container">
                  <label htmlFor="category" className="categories_label">
                    Categorie:
                  </label>
                  <input
                    value={newCategory.category}
                    onChange={(e) =>
                      setNewCategory((prevState) => ({
                        ...prevState,
                        category: e.target.value,
                      }))
                    }
                    id="category"
                    name="category"
                    className="categories_input"
                  ></input>
                </div>
                <button
                    type="submit"
                    onClick={handleAddCategory}
                    className="categories_confirm_btn"
                  >Adauga categorie</button>
              </form>
            </div>
          }
          {categories.map((category) => (
            <ExpandableCategory
              category={category}
              key={category.id}
              fetchCategories={fetchCategories}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Categories;

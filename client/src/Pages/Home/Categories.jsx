import "./Categories.css";
import CategoryItem from "./CategoryItem";
import axios from "axios";
import { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getSubcategories = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/categories`)
        .then((res) => {
          setCategories(res.data.data);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    };
    getSubcategories();
  }, []);

  return (
    <>
      <div className="categories_container">
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </div>
    </>
  );
};

export default Categories;

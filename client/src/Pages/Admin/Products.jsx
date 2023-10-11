import { useEffect, useState } from "react";
import {
  addProduct,
  getAllSubcategories,
  getCategories,
  getProducts,
} from "../../apiCalls";
import ExpandableProduct from "./ExpandableProduct";
import "./Products.css";
import { useSelector } from "react-redux";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [axiosError, setAxiosError] = useState([]);
  const logedInUser = useSelector((state) => state.user);
  const [newProdct, setNewProduct] = useState({
    title: "",
    desc: "",
    img: "",
    price: "",
    subcategory_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [currentSubcategories, setCurrentSubcategories] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts(logedInUser.token);
      const { success, message, data } = response.data;
      if (success === 1) {
        setProducts(data);
      } else {
        setAxiosError(message);
      }
    } catch (error) {
      setAxiosError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoriesAndSubcategories = async () => {
    try {
      const response1 = await getCategories();
      const data1 = response1.data.data;
      const response2 = await getAllSubcategories();
      const data2 = response2.data.data;
      setCategories(data1);
      setSubcategories(data2);
    } catch (error) {
      console.log(error.message);
    } finally {
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategoriesAndSubcategories();
  }, [logedInUser.token]);

  const updateCurrentSubcategories = (category_id) => {
    const tempCurrentSubcategories = subcategories.filter(
      (subcategory) => Number(subcategory.category_id) === Number(category_id)
    );
    setCurrentSubcategories(tempCurrentSubcategories);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    await addProduct(logedInUser.token, newProdct);
    await fetchProducts();
  };

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <div className="product_add_container">
            <h2>Adauga Produs</h2>
            <form className="product_add_form">
              <div className="product_input_container">
                <label htmlFor="title" className="product_label">
                  Titlu:
                </label>
                <input
                  value={newProdct.title}
                  onChange={(e) =>
                    setNewProduct((prevState) => ({
                      ...prevState,
                      title: e.target.value,
                    }))
                  }
                  id="title"
                  name="title"
                  className="product_input"
                ></input>
              </div>
              <div className="product_input_container">
                <label htmlFor="title" className="product_label">
                  desc:
                </label>
                <textarea
                  value={newProdct.desc}
                  onChange={(e) =>
                    setNewProduct((prevState) => ({
                      ...prevState,
                      desc: e.target.value,
                    }))
                  }
                  id="desc"
                  name="desc"
                  rows="10"
                  cols="50"
                  className="product_input"
                ></textarea>
              </div>
              <div className="product_input_container">
                <label htmlFor="img" className="product_label">
                  Imagine:
                </label>
                <input
                  value={newProdct.img}
                  onChange={(e) =>
                    setNewProduct((prevState) => ({
                      ...prevState,
                      img: e.target.value,
                    }))
                  }
                  id="img"
                  name="img"
                  className="product_input"
                ></input>
              </div>
              <div className="product_input_container">
                <label htmlFor="price" className="product_label">
                  Pret:
                </label>
                <input
                  value={newProdct.price}
                  onChange={(e) =>
                    setNewProduct((prevState) => ({
                      ...prevState,
                      price: e.target.value,
                    }))
                  }
                  id="price"
                  name="price"
                  className="product_input"
                ></input>
              </div>
              <div className="product_input_container">
                <label htmlFor="category" className="product_label">
                  Categorie:
                </label>
                <select
                  name="category"
                  id="category"
                  className="product_input"
                  onChange={(e) => updateCurrentSubcategories(e.target.value)}
                >
                  <option value="" disabled selected>
                    Selecteaza o categorie
                  </option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                </select>
              </div>
              <div className="product_input_container">
                <label htmlFor="subcategory" className="product_label">
                  Subategorie:
                </label>
                <select
                  name="subcategory"
                  id="subcategory"
                  className="product_input"
                  onChange={(e) =>
                    setNewProduct((prevState) => ({
                      ...prevState,
                      subcategory_id: e.target.value,
                    }))
                  }
                >
                  <option value="" disabled selected>
                    Selecteaza o subcategorie
                  </option>
                  {currentSubcategories &&
                    currentSubcategories.map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.subcategory}
                      </option>
                    ))}
                </select>
              </div>
              <button
                type="submit"
                onClick={handleAddProduct}
                className="product_confirm_btn"
              >
                Adauga Produs
              </button>
            </form>
          </div>
          {products.map((product) => (
            <ExpandableProduct
              product={product}
              key={product.id}
              fetchProducts={fetchProducts}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Products;

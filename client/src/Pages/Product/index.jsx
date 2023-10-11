import "./index.css";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { addProduct } from "../../redux/cartRedux";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

let text =
  "Dermoscent Essential 6 Spot-on Caine 0-10 Kg este un produs multifuncțional Dermoscent® pentru îngrijirea pielii, adaptat la toate tipurile de piele și păr al animalelor, chiar și la cele mai fragile și sensibile. Conține ingrediente active într-o cantitate optimă de acizi grași polinesaturați și agent activ de biodifuzare, esență de ulei de rozmarin, levănțică, melaleuca, cedru, oregano, ulei de boabe de cânepă și extract plantă Azadirachta indică, agenți de calmare și purificare, vitamina E.\n" +
  "ESSENTIAL 6 SPOT-ON a fost testat de către dermatologi veterinari pentru a se asigura de toleranța și de înalta calitate a produsului, pentru animalele tale.\n" +
  "Indicații:\n" +
  "ESSENTIAL 6 SPOT-ON reintegrează filmul hidrolipidic al pielii animalului și menține hidratarea optimă; favorizează balanța eco-sistemului natural dermic și consolidează sistemul de apărare al pielii, în special funcționarea barierei epidermice; purifică și atenuează iritațiile; dezodorizează respectând mirosul natural al animalului; ajută atât la atenuarea căderii părului cât și la creșterea acestuia.\n" +
  "Utilizare:\n" +
  "A se aplica o pipetă în fiecare săptămână pentru un tratament inițial de două luni consecutive, urmat de tratament regulat și continuu atâta vreme cât este necesar sau cel puțin o pipetă la fiecare 2 săptămâni. A se despărți blana între umăr și gât până pielea este vizibilă. A se goli conținutul pipetei pe piele în una sau două picături. Datorită capacității sale de biodifuzare, ESSENTIAL 6 SPOT-ON difuzează pe corpul animalului. A nu se spăla animalul 2 zile înainte și 2 zile după aplicarea produsului.\n" +
  "Notă: Este incompatibil dacă este combinat cu alte produse spot-on.\n" +
  "Precauții:\n" +
  "Pentru utilizarea externă.\n" +
  "A se evita expunerea directă la lumină, umiditate și temperatură ridicată peste 40⁰C. \n" +
  "A nu se păstra după deshiderea pipetelor.\n" +
  "Nu există date de siguranță penru adminstrarea la pisicuțe cu vârsta sub 3 luni.\n" +
  "A nu se lăsa la îndemâna copiilor.\n" +
  "Important: Dermoscent Essential 6 Spot-on Caine 0-10 Kg - 4 Pipete intra in categoria produse dermatologice. Consultati medicul veterinar www.mobile-vet.ro pentru stabilirea diagnosticului, prescrierea medicatiei sau a dietei in functie de nevoile specifice ale cainelui (pisicii) dumneavoastra.\n";

let textList = text.split(/\r?\n/);

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [quantity, setQuantity] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [product, setProduct] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = () => {
      axios
        .get(`http://localhost:5000/api/products/${id}`)
        .then((res) => {
          setProduct(res.data.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    };
    getProduct();
  }, []);

  const writeToCookie = (product) => {
    //initialize variables
    let cartProducts = {};
    let existingProduct;
    //check if cookie exist, and if so, find and retreive the product is already in the cart
    if (Cookies.get('cart')) {
      cartProducts = JSON.parse(Cookies.get('cart'));
      existingProduct = cartProducts.find(
        (p) => p.product.id === product.id
      );
    }

    //if the product already exist, increment it's quantity, else add it to the array
    if (existingProduct) {
      const updatedCartProducts = cartProducts.map((p) =>
        p.product.id === product.id
          ? { ...p, quantity: p.quantity + quantity }
          : p
      );
      Cookies.set('cart', JSON.stringify(updatedCartProducts));
    } else {
      const updatedCartProducts = cartProducts.length > 0 ? [...cartProducts, { product, quantity }] : [{ product, quantity }];
      //make the cookie expire in 7 days
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 7);
      Cookies.set('cart', JSON.stringify(updatedCartProducts), { expires: expirationDate });
    }
    console.log('Cart data written to cookie.');
  };

  const addToCart = () => {
    dispatch(addProduct({ product: product, quantity: quantity, price: product.price * quantity }))
    writeToCookie(product);
  }

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="single_product_first_container">
      <div className="single_product_product_container">
        <img src={product.img} className="single_product_image"></img>
        <div className="single_product_right_container">
          <h1 className="single_product_title">{product.title}</h1>
          <p className="single_product_price">{product.price} LEI</p>
          <div className="single_product_quantity">
            <button onClick={decreaseQuantity} className="single_product_add_substract_button">
              <RemoveIcon />
            </button>
            <input type="text" pattern="[0-9]*" value={quantity} onChange={(e) => { setQuantity(Number(e.target.value)) }} className="single_product_input"></input>
            <button onClick={increaseQuantity} className="single_product_add_substract_button">
              <AddIcon />
            </button>
          </div>
          <button onClick={addToCart} className="single_product_add_to_Cart_btn">
            ADAUGA IN COS
          </button>
        </div>
      </div>
      <div className="single_product_second_container">
        {product.desc.split(/\r?\n/).map((text) => (
          <p className="single_product_desc">{text}</p>
        ))}
      </div>
    </div>
  );
};

export default Product;

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { removeProduct, updateProductQuantity } from "../../redux/cartRedux";
import "./CartProduct.css";
const CartProduct = ({ product }) => {

  const dispatch = useDispatch();


  const decreaseQuantity = () => {
    if(product.quantity > 1)
    dispatch(updateProductQuantity({ product: product, quantity: product.quantity - 1 }));
  }

  const increaseQuantity = () => {
    dispatch(updateProductQuantity({ product: product, quantity: product.quantity + 1 }));
  }

  const setQuantity = (quantity) => {
    dispatch(updateProductQuantity({ product: product, quantity: quantity }));
  }

  const removeCartProduct = () => {
    dispatch(removeProduct({product}))
  }

  return (
    <>
      <div className="cart_product">
        <div className="cart_product_detail">
          <img src={product.product.img} className="cart_image"></img>
          <div className="cart_details">
            <span className="cart_product_name">
              <b>Product:</b> {product.product.title}
            </span>
            <span className="cart_product_id">
              <b>Product ID :</b> {product.product.id}
            </span>
          </div>
        </div>
        <div className="cart_price_detail">
          <div className="cart_product_amount_container">
            <button onClick={decreaseQuantity} className="single_product_add_substract_button">
              <RemoveIcon />
            </button>
            <input type="text" pattern="[0-9]*" value={product.quantity} onChange={(e) => {
              setQuantity(Number(e.target.value))
            }} className="single_product_input"></input >
            <button onClick={increaseQuantity} className="single_product_add_substract_button">
              <AddIcon />
            </button>
            <button onClick={removeCartProduct} className="single_product_delete_icon"><DeleteIcon/></button>
          </div>
          <div className="cart_product_price">{product.product.price} lei</div>
        </div>
      </div>
      <hr className="cart_hr"></hr>
    </>
  )
}

export default CartProduct;
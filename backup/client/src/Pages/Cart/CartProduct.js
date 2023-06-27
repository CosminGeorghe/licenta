import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartProduct = ({ product }) => {

  

  const decreaseQuantity = () => {
    
  }

  const increaseQuantity = () => {

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
          <button  className="single_product_add_substract_button">
              <RemoveIcon />
            </button>
            <input type="text" pattern="[0-9]*" value={product.quantity}  className="single_product_input"></input>
            <button  className="single_product_add_substract_button">
              <AddIcon />
            </button>
          </div>
          <div className="cart_product_price">{product.product.price} lei</div>
        </div>
      </div>
      <hr className="cart_hr"></hr>
    </>
  )
}

export default CartProduct;
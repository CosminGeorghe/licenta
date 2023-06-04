import { Add, Remove } from "@mui/icons-material";
import "./index.css";

const CartPage = () => {
  return (
    <div className="cart_container">
      <div className="cart_wrapper">
        <h1 className="cart_title">YOUR BAG</h1>
        <div className="cart_top">
          <button className="cart_top_button_unfilled">
            CONTINUE SHOPPING
          </button>
          <div className="cart_top_texts">
            <span className="cart_top_text">Shopping Bag(2)</span>
            <span className="cart_top_text">Your Wishlist(0)</span>
          </div>
          <button className="cart_top_button_filled">CHECK OUT NOW</button>
        </div>
        <div className="cart_bottom">
          <div className="cart_info">
            <div className="cart_product">
              <div className="cart_product_detail">
                <img src="https://mobilepet.ro/image/thumbnails/308x308/rx-cv-cardio-vascular-formula-90-capsule.jpg" className="cart_image"></img>
                <div className="cart_details">
                  <span className="cart_product_name">
                    <b>Product:</b> JESSIE THUNDER SHOES
                  </span>
                  <span className="cart_product_id">
                    <b>Product:</b> 567567567567
                  </span>
                </div>
              </div>
              <div className="cart_price_detail">
                <div className="cart_product_amount_container">
                    <Add/>
                    <div className="cart_product_amount">2</div>
                    <Remove/>
                </div>
                <div className="cart_product_price">30 lei</div>
              </div>
            </div>
            <hr className="cart_hr"></hr>
            <div className="cart_product">
              <div className="cart_product_detail">
                <img src="https://mobilepet.ro/image/thumbnails/308x308/rx-cv-cardio-vascular-formula-90-capsule.jpg" className="cart_image"></img>
                <div className="cart_details">
                  <span className="cart_product_name">
                    <b>Product:</b> JESSIE THUNDER SHOES
                  </span>
                  <span className="cart_product_id">
                    <b>Product:</b> 567567567567
                  </span>
                </div>
              </div>
              <div className="cart_price_detail">
                <div className="cart_product_amount_container">
                    <Add/>
                    <div className="cart_product_amount">2</div>
                    <Remove/>
                </div>
                <div className="cart_product_price">30 lei</div>
              </div>
            </div>
          </div>
          <div className="cart_sumamary">
            <h1 className="cart_summary_title">URDER SUMMARY</h1>
            <div className="cart_summary_item">
                <span className="cart_Summary_item_text">Subtotal</span>
                <span className="cart_Summary_item_price">80 lei</span>
            </div>
            <div className="cart_summary_item">
                <span className="cart_Summary_item_text">Estimated shipping</span>
                <span className="cart_Summary_item_price">10 lei</span>
            </div>
            <div className="cart_summary_item_total">
                <span className="cart_Summary_item_text">TOTAL</span>
                <span className="cart_Summary_item_price">80 lei</span>
            </div>
            <button className="cart_button">CHECK OUT NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

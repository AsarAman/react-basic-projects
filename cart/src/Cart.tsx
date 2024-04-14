import { Link } from "react-router-dom";
import { useCart } from "./context";
function Cart() {
  const { cartItems, addToCart, clearCart, totalAmount, totalItems, deleteFromCart } =
    useCart();

  return (
    <div className="App">
      <Link to="/">Back home</Link>
      <h1>Your Bag</h1>
      <h2>You have {totalItems} in your bag</h2>
      <h3>Your sub total is: {totalAmount}</h3>
      <div>
        {cartItems.map((item) => (
          <div className="item" key={item.id}>
            <div className="item-desc">
              <img src={item.img} alt="" />
              <div className="item-info">
                <h4>{item.title}</h4>
                <p>{item.price}</p>
              </div>
            </div>
            <div>
              <button onClick={() => addToCart(item)}>inc</button>
              <p>{item.amount}</p>
              <button onClick={() => deleteFromCart(item.id)}>dec</button>
            </div>
            <div></div>
          </div>
        ))}
      </div>
      {cartItems.length > 0 ? (
        <button onClick={clearCart}>Clear cart</button>
      ) : (
        <h3>Your Cart is Empty</h3>
      )}
    </div>
  );
}

export default Cart;

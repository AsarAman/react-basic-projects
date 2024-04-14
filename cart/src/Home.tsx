import { Link } from "react-router-dom";
import "./App.css";
import { useCart } from "./context";
function Home() {
    const { addToCart, data } = useCart();
  
    return (
      <div className="App">
    <Link to={'/cart'} >Cart</Link>
        <div className="cart-items">

          {data.map((item) => (
            <div className="item" key={item.id}>
              <div className="item-desc">
                <img src={item.img} alt="" />
                <div className="item-info">
                  <h4>{item.title}</h4>
                  <p>{item.price}</p>
                </div>
              </div>
              <div>
                <button onClick={() => addToCart(item)}>add to cart</button>
              </div>
              <div></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Home;
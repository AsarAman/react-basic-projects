import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ItemType = {
  id: string;
  title: string;
  price: string;
  img: string;
  amount: string;
};
type DataType = {
  data: ItemType[];
  cartItems: ItemType[];
  fetchItems: () => void;
  addToCart: (item: ItemType) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
  deleteFromCart: (id: string) => void;
};
const AppContext = createContext<DataType>({
  data: [],
  cartItems: [],
  fetchItems: () => {},
  addToCart: (item: ItemType) => {},
  clearCart: () => {},
  totalItems: 0,
  totalAmount: 0,
  deleteFromCart: (id: string) => {},
});

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState<ItemType[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // fetching data
  const fetchItems = async () => {
    try {
      const response = await fetch(
        "https://course-api.com/react-useReducer-cart-project"
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);


  //adding items to cart
  const addToCart = (item: ItemType) => {
    let itemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);
    if (itemIndex !== -1) {
      //we found item
     
      let updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].amount += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  // clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // calculating totals
  useEffect(() => {
    const { totalProducts, totalPrice } = cartItems.reduce(
      (total, cartItem) => {
        const { price, amount } = cartItem;

        total.totalProducts += Number(amount);
        total.totalPrice += Number(price) * Number(amount);
        

        return total;
      },
      { totalProducts: 0, totalPrice: 0 }
    );
    setTotalItems(totalProducts);
    setTotalAmount(totalPrice);
  }, [cartItems]);


  //delete from cart
  const deleteFromCart = (id: string) => {
    let updatedCartItems: ItemType[] = cartItems
      .map((item) => {
        if (item.id === id) {
          if (Number(item.amount) > 1) {
            return { ...item, amount: Number(item.amount) - 1 };
          } else {
            return null; // Remove item
          }
        } else {
          return item;
        }
      })
      .filter((item) => item !== null) as ItemType[];

   
    setCartItems(updatedCartItems);
  };

  return (
    <AppContext.Provider
      value={{
        data,
        cartItems,
        fetchItems,
        addToCart,
        clearCart,
        totalAmount,
        totalItems,
        deleteFromCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useCart = () => useContext(AppContext);

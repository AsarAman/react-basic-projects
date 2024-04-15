/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { appData } from "./data";

type ItemType = {
  id: string;
  title: string;
  price: string;
  img: string;
  amount: number;
};

type DataType = {
  data: ItemType[];
  cartItems: ItemType[];

  addToCart: (item: ItemType) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
  deleteFromCart: (id: string) => void;
};
const AppContext = createContext<DataType>({
  data: appData,
  cartItems: [],

  addToCart: (item: ItemType) => {},
  clearCart: () => {},
  totalItems: 0,
  totalAmount: 0,
  deleteFromCart: (id: string) => {},
});

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<ItemType[]>(appData);
  const [cartItems, setCartItems] = useState<ItemType[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

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

        total.totalProducts += amount;
        total.totalPrice += Number(price) * amount;

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
          if (item.amount > 1) {
            return { ...item, amount: item.amount - 1 };
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

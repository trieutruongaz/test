import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const [cartItems, setcartItems] = useState([])

    const url = "https://localhost:4000"

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setcartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }
    const removeFromCart = (itemId) => {
        setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTotalCartAmount = () => {
        let total = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            let itemInfo = food_list.find((product) => product._id === item);
            if (itemInfo) { // Check if itemInfo is found
              total += itemInfo.price * cartItems[item];
            } else {
              console.error("Item not found in food_list:", item); // Handle error if not found (optional)
            }
          }
        }
        return total;
      };
      

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        setcartItems,
        getTotalCartAmount,
        url
    }


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
}


export default StoreContextProvider
import { createContext, useReducer, useContext } from "react";
import { sumProducts } from "../helpers/helper";
import { useEffect } from "react";
const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.selectedItems.find((item) => item.id === action.payload.id)) {
        state.selectedItems.push({ ...action.payload, quantity: 1 });
      }
      return {
        ...state,
        ...sumProducts(state.selectedItems),
        checkout: false,
      };
    case "REMOVE_ITEM":
      const newSelectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        selectedItems: [...newSelectedItems],
        ...sumProducts(newSelectedItems),
      };
    case "INCREASE":
      const increaseindex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[increaseindex].quantity++;

      return {
        ...state,
        ...sumProducts(state.selectedItems),
      };

    case "DECREASE":
      const decreaseindex = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[decreaseindex].quantity--;

      return {
        ...state,
        ...sumProducts(state.selectedItems),
      };
    case "CHECKOUT":
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: true,
      };
    case "LOAD_SAVED_CART":
      return {
        ...action.payload,
      };
    default:
      throw new Error("Invalid Action!");
  }
};

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const getInitialState = () => {
    const stored = localStorage.getItem("shopCartState");
    return stored ? JSON.parse(stored) : initialState;
  };
  const [state, dispatch] = useReducer(reducer, initialState, getInitialState);

  useEffect(() => {
    localStorage.setItem("shopCartState", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
const useCart = () => {
  const { state, dispatch } = useContext(CartContext);
  return [state, dispatch];
};
export default CartProvider;
export { useCart };

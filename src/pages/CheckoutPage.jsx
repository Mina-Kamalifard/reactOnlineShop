import BasketCard from "../components/BasketCard";
import { useCart } from "../context/CartContext";
import styles from "./CheckoutPage.module.css";
import BasketSidebar from "../components/BasketSidebar";

const CheckoutPage = () => {
  const [state, dispatch] = useCart();
  const clickHandler = (type, payload) => dispatch({ type, payload });
  if (!state.itemsCounter) {
    return (
      <div className={styles.empty}>
        <p>"Your Basket is Empty"</p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <BasketSidebar state={state} clickHandler={clickHandler} />
      <div className={styles.products}>
        {state.selectedItems.map((product) => (
          <BasketCard
            key={product.id}
            data={product}
            clickHandler={clickHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckoutPage;

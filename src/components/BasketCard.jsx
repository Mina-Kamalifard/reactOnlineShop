import { shortenText } from "../helpers/helper";
import { MdDeleteOutline } from "react-icons/md";

const BasketCard = ({ data, clickHandler }) => {
  const { image, title, quantity } = data;
  return (
    <div>
      <img src={image} alt={title} />
      <p>{shortenText(title)}</p>
      <div>
        {quantity === 1 && (
          <button onClick={() => clickHandler("REMOVE_ITEM", data)}>
            <MdDeleteOutline />
          </button>
        )}
        {quantity > 1 && (
          <button onClick={() => clickHandler("DECREASE", data)}>-</button>
        )}
        <span>{quantity}</span>
        <button onClick={() => clickHandler("INCREASE", data)}>+</button>
      </div>
    </div>
  );
};

export default BasketCard;

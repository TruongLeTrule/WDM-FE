import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FoodServiceCard = ({ img, name, price, id, handleAddBtnClick }) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="card">
      <img src={img} alt={name} className="lob-img" />
      <div className="content">
        <h5>{name}</h5>
        <p className="price">{price}$</p>
        <div className="quantity-group">
          <FaMinus
            className={quantity === 0 ? 'disable icon' : 'icon'}
            onClick={() => setQuantity(quantity === 0 ? 0 : quantity - 1)}
          />
          <div className="quantity">{quantity}</div>
          <FaPlus className="icon" onClick={() => setQuantity(quantity + 1)} />
        </div>
        <div className="btn-group">
          <div className="btn reset" onClick={() => setQuantity(0)}>
            reset
          </div>
          <div
            className="btn"
            onClick={() => {
              if (quantity > 0) {
                handleAddBtnClick({ id, quantity, name, price });
                setQuantity(0);
              }
            }}
          >
            add
          </div>
        </div>
      </div>
    </div>
  );
};
export default FoodServiceCard;

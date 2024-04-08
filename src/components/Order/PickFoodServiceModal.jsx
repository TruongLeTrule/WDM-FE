import { useState, useRef, useEffect } from 'react';
import { FaShoppingCart, FaRegTrashAlt } from 'react-icons/fa';
import { foodList, serviceList } from '../../utils/orderTestData';
import Modal from '../Modal';
import FoodServiceCard from './FoodServiceCard';
import beefImg from '../../assets/images/beef.png';
import balletImg from '../../assets/images/ballet.jpg';
import Wrapper from '../../assets/wrappers/Order/CardGroupWrapper';

const customStyle = {
  content: {
    width: '70vw',
    height: '87vh',
    left: '50%',
    top: '50%',
    padding: 0,
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
};

const PickFoodServiceModal = ({
  isOpen,
  setModalClose,
  setValue,
  setNextModalOpen,
  type,
}) => {
  const [renderList, setRenderList] = useState([]);
  const cartRef = useRef(null);
  const [pickedItem, setPickItem] = useState([]);
  const [showPickedItemList, setShowPickedItemList] = useState(false);

  const total = pickedItem.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const handleNextBtnClick = () => {
    console.log(pickedItem);
    setValue(pickedItem);
    setNextModalOpen();
  };

  const handleAddBtnClick = (newItem) => {
    if (pickedItem.find((item) => item.id === newItem.id)) {
      const itemList = pickedItem.map((item) =>
        item.id === newItem.id ? newItem : item
      );
      return setPickItem(itemList);
    }
    return setPickItem([...pickedItem, newItem]);
  };

  const handleTrashClick = (id) => {
    const newItemList = pickedItem.filter((item) => item.id !== id);
    setPickItem(newItemList);
  };

  const handleOutsideClick = (e) => {
    if (cartRef.current && !cartRef.current.contains(e.target)) {
      setShowPickedItemList(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  useEffect(() => {
    if (type === 'food') setRenderList(foodList);
    if (type === 'service') setRenderList(serviceList);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      setModalClose={setModalClose}
      customStyle={customStyle}
    >
      <Wrapper>
        <div className="header">
          <h4>choose {type}</h4>
          <div className="cart-wrapper" ref={cartRef}>
            {!showPickedItemList ? (
              <>
                <FaShoppingCart
                  className="icon"
                  onClick={() => {
                    setShowPickedItemList(true);
                  }}
                />
                <span className="badge">{pickedItem.length}</span>
              </>
            ) : (
              <>
                <div className="food-list">
                  <h6>{type} list</h6>
                  {pickedItem.length ? (
                    <>
                      <div className="food-container">
                        {pickedItem.map(({ id, quantity, name, price }) => (
                          <div className="food" key={id}>
                            <img
                              src={type === 'food' ? beefImg : balletImg}
                              alt={name}
                            />
                            <div className="col">
                              <span>{name}</span>
                              <span className="quantity">{quantity}</span>
                            </div>
                            <span>{price * quantity}$</span>
                            <FaRegTrashAlt
                              className="trash"
                              onClick={() => handleTrashClick(id)}
                            />
                          </div>
                        ))}
                      </div>
                      <strong>total {total}$</strong>
                      <button className="btn" onClick={handleNextBtnClick}>
                        next: choose {type === 'food' ? 'service' : 'payment'}
                      </button>
                    </>
                  ) : (
                    <p>please choose some {type}s</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="container">
          {renderList.map(({ id, name, price }) => (
            <FoodServiceCard
              img={type === 'food' ? beefImg : balletImg}
              key={id}
              id={id}
              name={name}
              price={price}
              handleAddBtnClick={handleAddBtnClick}
            />
          ))}
        </div>
      </Wrapper>
    </Modal>
  );
};
export default PickFoodServiceModal;

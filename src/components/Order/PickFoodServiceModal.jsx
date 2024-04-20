import { getFoods } from '../../api/food.api';
import { getServices } from '../../api/service.api';
import { useOrderContext } from '../../pages/Order';
import { useState, useRef, useEffect } from 'react';
import { FaShoppingCart, FaRegTrashAlt } from 'react-icons/fa';
import { orderFood, orderService } from '../../api/wedding.api';
import Modal from '../Modal';
import FoodServiceCard from './FoodServiceCard';
import beefImg from '../../assets/images/beef.png';
import balletImg from '../../assets/images/ballet.jpg';
import Wrapper from '../../assets/wrappers/Order/CardGroupWrapper';
import Loading from '../Loading';

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
  setNextModalOpen,
  type,
}) => {
  const { newOrder, setNewOrder } = useOrderContext();
  const [renderList, setRenderList] = useState([]);
  const cartRef = useRef(null);
  const [pickedItem, setPickItem] = useState([]);
  const [showPickedItemList, setShowPickedItemList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const total = pickedItem.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const handleNextBtnClick = async () => {
    let itemTotalPrice;
    const handledList = pickedItem.map(({ id, quantity }) => ({
      id,
      count: quantity,
    }));
    const pricePerTable = pickedItem.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    try {
      if (type === 'food') {
        itemTotalPrice = await orderFood(newOrder.id, handledList);
        setNewOrder({
          ...newOrder,
          pricePerTable,
        });
      }
      if (type === 'service') {
        itemTotalPrice = await orderService(newOrder.id, handledList);
        setNewOrder({
          ...newOrder,
          total: itemTotalPrice.data.totalPrice,
          serviceFee: itemTotalPrice.data.service.servicePrice,
        });
      }
      setNextModalOpen();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAddBtnClick = (newItem) => {
    // If item existed in picked list, set new quantity
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

  const fetchData = async (type) => {
    try {
      const data = type === 'food' ? await getFoods() : await getServices();
      setRenderList(data.data);
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchData(type);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  return (
    <Modal
      isOpen={isOpen}
      setModalClose={setModalClose}
      customStyle={customStyle}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <div className="header">
            <h4>choose {type}</h4>
            <div
              className="cart-wrapper"
              ref={cartRef}
              onClick={() => {
                setShowPickedItemList(true);
              }}
            >
              {!showPickedItemList ? (
                <>
                  <FaShoppingCart className="icon" />
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
                          next: {type === 'food' ? 'choose service' : 'payment'}
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
      )}
    </Modal>
  );
};
export default PickFoodServiceModal;

import { getFoods, checkInventoryForFood } from '../../api/food.api';
import { getServices } from '../../api/service.api';
import { useState, useRef, useEffect, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaShoppingCart, FaRegTrashAlt } from 'react-icons/fa';
import {
  orderFood,
  orderService,
  getFoodsOrder,
  getServicesOrder,
  editFoodsOrder,
  editServicesOrder,
} from '../../api/wedding.api';
import { FaPlus, FaMinus } from 'react-icons/fa';
import FoodServiceCard from './FoodServiceCard';
import beefImg from '../../assets/images/beef.png';
import balletImg from '../../assets/images/ballet.jpg';
import Wrapper from '../../assets/wrappers/Order/CardGroupWrapper';
import Loading from '../Loading';
import styled from 'styled-components';
import { PiForkKnifeBold, PiGuitarDuotone } from 'react-icons/pi';


const PickFoodServiceModal = (p) => {

  const {
    type,
    setModalClose,
    setNextModalOpen,
    setServiceData,
    setFoodData,
    orderId,
    editOrder,
  } = p
  const [Menu, setMenu] = useState(type)

  const [renderList, setRenderList] = useState([]);
  const cartRef = useRef(null);
  const [pickedItem, setPickedItem] = useState([]);
  const [showPickedItemList, setShowPickedItemList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const total = useMemo(
    () => pickedItem.reduce((acc, item) => acc + item.count * item.price, 0),
    [pickedItem]
  );
  const [page, setPage] = useState("food")

  const pageRef = useRef("food")
  const handleNextBtnClick = async () => {
    let itemTotalPrice;
    const handledList = pickedItem.map(({ id, count }) => ({
      id,
      count: count,
    }));
    try {
      if (Menu === 'food') {
        itemTotalPrice = await orderFood(orderId, handledList);
        setFoodData(itemTotalPrice.data.totalPrice);
      }
      if (Menu === 'service') {
        itemTotalPrice = await orderService(orderId, handledList);
        setServiceData(
          itemTotalPrice.data.totalPrice,
          itemTotalPrice.data.service.servicePrice
        );
      }
      setNextModalOpen();
    } catch (error) {
      toast.warning(error.message);
    }
  };

  const handleAddBtnClick = async (newItem) => {
    try {
      const foodId = newItem.id
      const upcomingCount = newItem.count
      Menu === 'food' && await checkInventoryForFood(foodId, upcomingCount)
      // If item existed in picked list, set new quantity
      toast.success(`${newItem.name} Added successfully!`);
      if (pickedItem.find((item) => item.id === newItem.id)) {
        const itemList = pickedItem.map((item) =>
          item.id === newItem.id ? newItem : item
        );
        return setPickedItem(itemList);
      }
      return setPickedItem([...pickedItem, newItem]);  
      
    } catch (error) {
      toast.warning(error.message);
    }
    
  };

  const handleTrashClick = (id) => {
    const newItemList = pickedItem.filter((item) => item.id !== id);
    setPickedItem(newItemList);
  };

  const handleOutsideClick = (e) => {
    if (cartRef.current && !cartRef.current.contains(e.target)) {
      setShowPickedItemList(false);
    }
  };

  const fetchData = async (Menu) => {
    try {
      const data = Menu === 'food' ? await getFoods() : await getServices();
      setRenderList(data.data);
      setIsLoading(false);
    } catch (error) {
      toast.warning(error.message);
    }
  };

  const fetchPickedItem = async (Menu) => {
    try {
      let fetchedItems;
      if (Menu === 'food') {
        fetchedItems = await getFoodsOrder(orderId);
        // handle array key name
        fetchedItems = fetchedItems.data.map(
          ({ food_id, food_name, food_price, count }) => ({
            id: food_id,
            name: food_name,
            price: food_price,
            count,
          })
        );
        setPickedItem(fetchedItems);
      }
      if (Menu === 'service') {
        fetchedItems = await getServicesOrder(orderId);
        // handle array key
        fetchedItems = fetchedItems.data.map(
          ({ service_id, service_name, service_price, count }) => ({
            id: service_id,
            name: service_name,
            price: service_price,
            count,
          })
        );
        setPickedItem(fetchedItems);
      }
    } catch (error) {
      toast.warning(error.message);
    }
  };

  const handleSaveBtnClick = async (Menu) => {
    try {
      let result;
      if (Menu === 'food') {
        result = await editFoodsOrder(orderId, pickedItem);
        editOrder(
          result.data.foodPrice,
          result.data.remainPrice,
          result.data.totalPrice
        );
      }
      if (Menu === 'service') {
        result = await editServicesOrder(orderId, pickedItem);
        editOrder(
          result.data.servicePrice,
          result.data.remainPrice,
          result.data.totalPrice
        );
      }
      setModalClose();
    } catch (error) {
      toast.warning(error.message);
    }
  };

  const handleItemAmountChange = (id, type) => {
    const newList = pickedItem.map((item) => {
      if (item.id === id) {
        if (type === 'increase') return { ...item, count: item.count + 1 };
        if (type === 'decrease')
          return item.count - 1 <= 0
            ? null
            : { ...item, count: item.count - 1 };
      }
      return item;
    });
    const removedNullList = newList.filter((item) => item !== null);
    setPickedItem(removedNullList);
  };

  useEffect(() => {
    fetchData(Menu);
    if (editOrder) fetchPickedItem(Menu);
  }, []);

  // Handle outside click event
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  useEffect(() => {
    setMenu(page)
  }, [page]);


  return (
    <>
       {/* <ToastContainer /> */}
      {isLoading ? (
        <Loading />
      ) : (
        <Wrapper>
          <div className="header">
          <FSheaderContainer setPage={setPage} pageRef={pageRef} SeachBox={false}/>
            <div
              className={
                showPickedItemList ? 'cart-wrapper' : 'cart-wrapper pointer'
              }
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
                  {/* Picked list */}
                  <div className="food-list">
                    <h6>{Menu} list</h6>
                    {pickedItem.length ? (
                      <>
                        <div className="food-container">
                          {pickedItem.map(({ id, count, name, price }) => (
                            <div className="food" key={id}>
                              <img
                                src={Menu === 'food' ? beefImg : balletImg}
                                alt={name}
                              />
                              <div className="col">
                                <span>{name}</span>
                                <div className="quantity-group">
                                  <FaMinus
                                    className="pointer"
                                    onClick={() =>
                                      handleItemAmountChange(
                                        id,
                                        (type = 'decrease')
                                      )
                                    }
                                  />
                                  <span className="quantity">{count}</span>
                                  <FaPlus
                                    className="pointer"
                                    onClick={() =>
                                      handleItemAmountChange(
                                        id,
                                        (type = 'increase')
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <span>{price * count}$</span>
                              <FaRegTrashAlt
                                className="trash"
                                onClick={() => handleTrashClick(id)}
                              />
                            </div>
                          ))}
                        </div>
                        <strong>total {total}$</strong>
                        {!editOrder ? (
                          <button className="btn" onClick={handleNextBtnClick}>
                            next:
                            {type === 'food' ? 'choose service' : 'payment'}
                          </button>
                        ) : (
                          <button
                            className="btn"
                            onClick={() => handleSaveBtnClick(type)}
                          >
                            Save
                          </button>
                        )}
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
            {renderList.map(({ id, name, price, url, inventory }) =>{
              return(
                <FoodServiceCard
                  img={type === 'food' ? (url? url: beefImg) : (url ? url :balletImg)}
                  key={id}
                  id={id}
                  name={name}
                  price={price}
                  inventory={inventory}
                  handleAddBtnClick={handleAddBtnClick}
                />
              )
            } 
            )}
          </div>
        </Wrapper>
      )}
    </>
  );
};

const FSheaderContainer = (p) => {
  const { setPage, pageRef } = p

  return (
      <FSheader>
          <div className="left">
              <button onClick={() => {setPage("food"); pageRef.current = "food" }} className={`food ${pageRef.current === "food" ? "active":  ""}`}><PiForkKnifeBold /> FOOD</button>
              <button onClick={() => {setPage("service"); pageRef.current = "service"}} className={`service ${pageRef.current === "service" ? "active":  ""}`}><PiGuitarDuotone /> SERVICE</button>
          </div>
      </FSheader>
  )
}

const FSheader = styled.div`
    height: 100%;
    padding-right: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background-color: black;
    .left {
        // border: 1px solid red;
        display: flex;
        width: 300px;
        height: 100%;
        align-items: end;
        // column-gap: 2rem;
        button {
            // background-color: var(--grey-100);
            width: 10rem;
            font-size: larger;
            height: 100%;
            border: 2px solid var(--grey-300);
            border-top-right-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            .icon {
              font-size: 1.3em;
            }
            &:hover{
                border-color: var(--primary);
                color: var(--primary);
                box-shadow: var(--shadow-3);
            }
          }
        .service{
          border-top-left-radius: 20px;
        }
        .food, .service {

          &.active {
            border-color: var(--primary); 
            color: var(--primary);
          }
        }
      }
    .right{
      form {
        display: flex;
        align-items: center;
        padding: 1rem;
        border-radius: 999px;
        background-color: var(--grey-100);
        border: 1px solid transparent;
        // border: 1px solid red;
        width: 18rem;
        transition: border-color 0.25s;
      }
      form:focus-within {
        border-color: var(--primary);
        .icon {
          color: var(--primary);
        }
      }
      .icon {
        color: var(--grey-300);
        margin: 0 0.5rem;
        transition: color 0.5s;
      }
      input {
        text-transform: capitalize;
      }
      input::placeholder {
        color: var(--grey-400);
        font-weight: 500;
      }
    }
    

`
export default PickFoodServiceModal;

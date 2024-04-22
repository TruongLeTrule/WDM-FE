import { createContext, useState, useEffect } from "react";
import { getFoods } from "../api/food.api.js";
import { getServices } from "../api/service.api.js";

export const FoodServiceContext = createContext(null);

const FoodServiceProvider = (p) => {
  const { children } = p;
  const [foods, setFoods] = useState([]);
  const [foodSearchList, setFoodSearchList] = useState([])

  const [services, setServices] = useState([]);
  const [serviceSearchList, setServiceSearchList] = useState([])

  useEffect(() => {
    Promise.all([getFoodData(), getServiceData()])
  }, []);
  const getFoodData = async() => {
    try {
      const foodData = await getFoods()
      setFoods(foodData.data)
    } catch (error) {
      console.log(error);
    }
  }

  const getServiceData = async() => {
    try {
      const serviceData = await getServices()
      setServices(serviceData.data)
    } catch (error) {
      console.log(error);
    }
  }


  const value = {
    foods,
    foodSearchList, setFoodSearchList,
    services,
    serviceSearchList, setServiceSearchList
  }
  return <FoodServiceContext.Provider value={value}>{children}</FoodServiceContext.Provider>;
};

export default FoodServiceProvider;
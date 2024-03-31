import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import foodData from "../../assets/images/FoodService/Food.js";
const FContent = () => {
    const foodlists = foodData.getAllFoods();

    return (
        <div className="fcontent">
            <div className="map_container">
                <div className="food_box_add_food">
                    <IoMdAddCircleOutline className='icon' />
                </div>
                {foodlists.map((food) => (
                    <div key={food.id} className="food_box">
                        <div className="food_img">
                            <img src={food.image} alt={food.title} className='image' />
                        </div>
                        <p className='title'>{food.title}</p>
                        <p>{food.price}$</p>
                        <div className="actions">
                            <button className='edit'>Edit</button>
                            <button className='delete'>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FContent;


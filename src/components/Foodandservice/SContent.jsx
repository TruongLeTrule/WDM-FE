import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import serviceData from "../../assets/images/FoodService/Service.js";

const SContent = () => {
    const servicelists = serviceData.getAllServices();

    return (
        <div className="scontent">
            <div className="map_container">
                <div className="service_box_add_service">
                    <IoMdAddCircleOutline className='icon' />
                </div>
                {servicelists.map((service) => (
                    <div key={service.id} className="service_box">
                        <div className="service_img">
                            <img src={service.image} alt={service.title} className='image' />
                        </div>
                        <p className='title'>{service.title}</p>
                        <p>{service.price}$</p>
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

export default SContent;

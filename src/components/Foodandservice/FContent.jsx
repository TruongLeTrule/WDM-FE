import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Modal, Button, Input, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import foodData from "../../assets/images/FoodService/Food.js";

const { Option } = Select;
const { TextArea } = Input;

const FContent = () => {
    const [foodlists, setFoodLists] = useState(foodData.getAllFoods());
    const [modalVisible, setModalVisible] = useState(false);

    const handleDelete = (id) => {
        // Filter out the food item with the given id
        const updatedFoodLists = foodlists.filter((food) => food.id !== id);
        // Update the state with the filtered food lists
        setFoodLists(updatedFoodLists);
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const handleOk = () => {
        setModalVisible(false);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleUpload = () => {
        message.success("Upload successfully.");
    };

    return (
        <div className="fcontent">
            <div className="map_container">
                <div className="food_box_add_food">
                    <IoMdAddCircleOutline className="icon" onClick={showModal} />
                </div>
                {foodlists.map((food) => (
                    <div key={food.id} className="food_box">
                        <div className="food_img">
                            <img src={food.image} alt={food.title} className="image" />
                        </div>
                        <p className="title">{food.title}</p>
                        <p>{food.price}$</p>
                        <div className="actions">
                            <button className="edit" onClick={showModal}>
                                Edit
                            </button>
                            <button className="delete" onClick={() => handleDelete(food.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Modal
                visible={modalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={handleOk}>
                        Save
                    </Button>,
                ]}
            >
                <Upload>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
                <Input placeholder="Name" style={{ marginTop: 10 }} />
                <Input placeholder="Price" style={{ marginTop: 10 }} prefix="$" suffix="USD" />
                <Select defaultValue="OK" style={{ width: 120, marginTop: 10 }}>
                    <Option value="OK">OK</Option>
                    <Option value="NOT">NOT</Option>
                </Select>
            </Modal>
        </div>
    );
};

export default FContent;

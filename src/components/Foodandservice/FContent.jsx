import React, { useState, useContext } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Modal, Button, Input, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import foodData from "../../assets/images/FoodService/Food.js";

const FoodContext = React.createContext();

const { Option } = Select;
const { TextArea } = Input;

const FContent = () => {
    const [foodlists, setFoodLists] = useState(foodData.getAllFoods());
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);
    const [tempName, setTempName] = useState("");
    const [tempPrice, setTempPrice] = useState("");
    const [tempStatus, setTempStatus] = useState("OK");
    
    const handleEdit = (food) => {
        setSelectedFood(food);
        setTempName(food.title);
        setTempPrice(food.price.toString());
        setTempStatus(food.status);
        setModalVisible(true);
    };
    
    const handleDelete = (id) => {
        const updatedFoodLists = foodlists.filter((food) => food.id !== id);
        setFoodLists(updatedFoodLists);
    };
    
    const handleOk = () => {
        const updatedFood = { ...selectedFood, title: tempName, price: tempPrice, status: tempStatus };
        const index = foodlists.findIndex((food) => food.id === selectedFood.id);
        const updatedFoodLists = [...foodlists.slice(0, index), updatedFood, ...foodlists.slice(index + 1)];
        setFoodLists(updatedFoodLists);
        setModalVisible(false);
        setTempName("");
        setTempPrice("");
        setTempStatus("OK");
    };
    
    const handleCancel = () => {
        setModalVisible(false);
        setTempName("");
        setTempPrice("");
        setTempStatus("OK");
    };
    
    const showModal = () => {
        setTempName("");
        setTempPrice("");
        setTempStatus("OK");
        setModalVisible(true);
    };
    
    return (
        <FoodContext.Provider value={{ selectedFood, setSelectedFood }}>
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
                                <button className="edit" onClick={() => handleEdit(food)}>
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
                    style={{ maxWidth: "80%", maxHeight: "80%", margin: "auto" }}
                >
                    <FoodModalContent
                        tempName={tempName}
                        setTempName={setTempName}
                        tempPrice={tempPrice}
                        setTempPrice={setTempPrice}
                        tempStatus={tempStatus}
                        setTempStatus={setTempStatus}
                    />
                </Modal>
            </div>
        </FoodContext.Provider>
    );
};

const FoodModalContent = ({ tempName, setTempName, tempPrice, setTempPrice, tempStatus, setTempStatus }) => {
    const { selectedFood } = useContext(FoodContext);

    return (
        <div>
            <Upload>
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            <Input
                placeholder="Name"
                style={{ marginTop: 10 }}
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
            />
            <Input
                placeholder="Price"
                style={{ marginTop: 10 }}
                prefix="$"
                suffix="USD"
                value={tempPrice}
                onChange={(e) => setTempPrice(e.target.value)}
            />
            <Select
                defaultValue="OK"
                style={{ width: 120, marginTop: 10 }}
                value={tempStatus}
                onChange={(value) => setTempStatus(value)}
            >
                <Option value="OK">OK</Option>
                <Option value="NOT">NOT</Option>
            </Select>
        </div>
    );
};

export default FContent;

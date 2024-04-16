import React, { useState, useContext, useEffect, useRef } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Modal, Button, Input, Upload, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import foodData from "../../assets/images/FoodService/Food.js";
import { createFood, deleteFood, getFoods, updateFood } from "../../api/food.api.js";
import { uploadFoodImage } from "../../api/file.api.js"
import { getFileBlobUrl } from "../../utils/index.js";

const FoodContext = React.createContext();

const { Option } = Select;
const { TextArea } = Input;

const FContent = () => {
    const [foodlists, setFoodLists] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFood, setSelectedFood] = useState(null);

    const [tempName, setTempName] = useState("");
    const [tempPrice, setTempPrice] = useState("");
    const [tempStatus, setTempStatus] = useState("OK");
    const [tempFile, setTempFile] = useState(null)
    const [tempInventory, setInventory] = useState()


    const isEdit = useRef(false)
    
    const prepareFileUploaded = (file) => {
        setTempFile(file)
    }

    const handleEdit = (food) => {
        setSelectedFood(food);
        isEdit.current = true
        setTempName(food.name);
        setTempPrice(food.price.toString());
        setInventory(food.inventory)
        setTempStatus(food.status ? "OK" : "NOT");
        setModalVisible(true);
    };
    
    const handleDelete = async (id) => {
        const updatedFoodLists = foodlists.filter((food) => food.id !== id);
        setFoodLists(updatedFoodLists);
        await deleteFood(id)

    };
    const updateFoodListItemById = (foodId, foodData) => {
        const newList = foodlists.map(item => {
            // Check if the current item's id matches the foodId
            if (item.id === foodId) {
                return {...item, ...foodData};
            }
            // If it doesn't match, return the item unchanged
            return item;
        });

        // Return the updated list to update the state

        setFoodLists(newList);
    }
    const UpdateFoodListWithNewData = (foodData) => {
        const newList = [foodData, ...foodlists]
        setFoodLists(newList);
    }

    const handleOk = async () => {
        try{
            const updatedFood = { name: tempName, price: Number(tempPrice), status: tempStatus==="OK", inventory: Number(tempInventory) };
         
            // console.log("updatedFood", updatedFood)
            let foodData = {};
            let updatedFoodLists = {}
            if(isEdit.current) {
                const res = await updateFood(selectedFood.id, updatedFood)

                foodData = res.data
                setFoodLists(updatedFoodLists);
                if(tempFile) {
                    console.log(tempFile)
                    
                    await uploadFoodImage(tempFile, foodData.id)
                    const url = getFileBlobUrl(tempFile)
                    foodData.url = url
                    updateFoodListItemById(foodData.id, foodData)
                }
            }
            else {
                const res = await createFood(updatedFood)
                foodData = res.data
                console.log(foodData)
                if(tempFile) {
                    console.log(tempFile)
                    
                    await uploadFoodImage(tempFile, foodData.id)
                    const url = getFileBlobUrl(tempFile)
                    foodData.url = url
                }
                UpdateFoodListWithNewData(foodData)
            }

            setModalVisible(false);
            setTempName("");
            setTempPrice("");
            setTempStatus("OK");

        } catch(error) {
            console.log(error.message);
        } finally {
            isEdit.current = false
        }
    };
    
    const handleCancel = () => {
        setModalVisible(false);
        setTempName("");
        setTempPrice("");
        setTempStatus("OK");
        isEdit.current = false;
    };
    
    const showModal = () => {
        setTempName("");
        setTempPrice("");
        setTempStatus("OK");
        setModalVisible(true);
    };

    useEffect(() => {
        foodAPI();
    }, [])
    
    const foodAPI = async () => {
        try {
            const foods = await getFoods();
            setFoodLists(foods.data)

        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <FoodContext.Provider value={{ selectedFood, setSelectedFood }}>
            <div className="fcontent">
                <div className="map_container">
                    <div className="food_box_add_food" onClick={showModal}>
                        <IoMdAddCircleOutline className="icon" />
                    </div>
                    {foodlists && foodlists.length > 0 && foodlists.map((food) => (
                        <div key={food.id} className="food_box">
                            <div className="food_img">
                                <img src={food.url} alt={food.name} className="image" />
                            </div>
                            <p className="title">{food.name}</p>
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
                    open={modalVisible}
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
                        prepareFileUploaded={prepareFileUploaded}
                        setInventory={setInventory}
                        tempInventory={tempInventory}
                    />
                </Modal>
            </div>
        </FoodContext.Provider>
    );
};

const FoodModalContent = (p) => {
    const { tempName, setTempName, tempPrice, setTempPrice, tempStatus, setTempStatus, prepareFileUploaded,tempInventory, setInventory  } = p
    // const { selectedFood } = useContext(FoodContext);

    return (
        <div>
            <Upload multiple={false} maxCount={1} onChange={(e) => {
                const file = e.file.originFileObj
                file.filename = file.name
                prepareFileUploaded(file)
            }}>
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
            <Input
                placeholder="Inventory"
                style={{ marginTop: 10 }}
                value={tempInventory}
                onChange={(e) => setInventory(e.target.value)}
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

import React, { useState, useContext } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Modal, Button, Input, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import serviceData from "../../assets/images/FoodService/Service.js";

const { Option } = Select;
const { TextArea } = Input;

const ServiceContext = React.createContext(); 

const SContent = () => {
    const [servicelists, setServiceLists] = useState(serviceData.getAllServices());
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [tempName, setTempName] = useState("");
    const [tempPrice, setTempPrice] = useState("");
    const [tempStatus, setTempStatus] = useState("OK");

    const handleEdit = (service) => {
        setSelectedService(service);
        setTempName(service.title);
        setTempPrice(service.price.toString());
        setTempStatus(service.status);
        setModalVisible(true);
    };

    const handleDelete = (id) => {
        const updatedServiceLists = servicelists.filter((service) => service.id !== id);
        setServiceLists(updatedServiceLists);
    };

    const showModal = () => {
        setTempName("");
        setTempPrice("");
        setTempStatus("OK");
        setModalVisible(true);
    };

    const handleOk = () => {
        const updatedService = { ...selectedService, title: tempName, price: tempPrice, status: tempStatus };
        const index = servicelists.findIndex((service) => service.id === selectedService.id);
        const updatedServiceLists = [...servicelists.slice(0, index), updatedService, ...servicelists.slice(index + 1)];
        setServiceLists(updatedServiceLists); 
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

    return (
        <ServiceContext.Provider value={{ selectedService, setSelectedService }}>
            <div className="scontent">
                <div className="map_container">
                    <div className="service_box_add_service" onClick={showModal}>
                        <IoMdAddCircleOutline className="icon" />
                    </div>
                    {servicelists.map((service) => (
                        <div key={service.id} className="service_box">
                            <div className="service_img">
                                <img src={service.image} alt={service.title} className="image" />
                            </div>
                            <p className="title">{service.title}</p>
                            <p>{service.price}$</p>
                            <div className="actions">
                                <button className="edit" onClick={() => handleEdit(service)}>
                                    Edit
                                </button>
                                <button className="delete" onClick={() => handleDelete(service.id)}>
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
                    <ServiceModalContent 
                        tempName={tempName}
                        setTempName={setTempName}
                        tempPrice={tempPrice}
                        setTempPrice={setTempPrice}
                        tempStatus={tempStatus}
                        setTempStatus={setTempStatus}
                    />
                </Modal>
            </div>
        </ServiceContext.Provider>
    );
};

const ServiceModalContent = ({ tempName, setTempName, tempPrice, setTempPrice, tempStatus, setTempStatus }) => {
    const { selectedService } = useContext(ServiceContext);

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

export default SContent;

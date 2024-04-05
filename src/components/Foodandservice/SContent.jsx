import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Modal, Button, Input, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import serviceData from "../../assets/images/FoodService/Service.js";

const { Option } = Select;
const { TextArea } = Input;

const SContent = () => {
    // Define state for service lists and its updater function
    const [servicelists, setServiceLists] = useState(serviceData.getAllServices());
    const [modalVisible, setModalVisible] = useState(false);

    const handleDelete = (id) => {
        // Filter out the service item with the given id
        const updatedServiceLists = servicelists.filter((service) => service.id !== id);
        // Update the state with the filtered service lists
        setServiceLists(updatedServiceLists);
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
                            <button className="edit" onClick={showModal}>
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

export default SContent;


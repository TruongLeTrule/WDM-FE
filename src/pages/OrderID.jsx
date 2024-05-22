import { useEffect, useRef, useState } from 'react';
import { FaPenToSquare } from 'react-icons/fa6';
import { Modal, DatePick, TextInput, TextRow } from '../components';
import { editOrderLeft, editOrderRight } from '../utils/orderRenderArr';
import { ToastContainer, toast } from 'react-toastify';
import { getWeddingById } from '../api/wedding.api';
import { truncateUUID } from '../utils';
import { useParams } from 'react-router-dom';
import { Header } from '../components';
import styled from 'styled-components';
import { Input, TreeSelect } from 'antd';
import PickFoodService from '../components/Order/OrderId/PickFoodService';

import Flatpickr from "react-flatpickr";
import { getLobbyTypes } from '../api/lobby.api';


const OrderID = (p) => {
  const {
    handleEditLobbyClick,
  } = p
  const [orderData, setOrderData] = useState({})

  const { id } = useParams()
  

  useEffect(() => {
    const fetchWedding = async (id) =>  {
      try {
        const res = await getWeddingById(id)
        setOrderData(res.data)
      } catch (error) {
        alert(error.message)
      }
    }

    fetchWedding(id)

  }, [id]);



  return (
    <Container>
      <Header
        handleAddBtnClick={() => {}}
        headerTitle={`Order ${truncateUUID(id)}`}
        action={false}
      />
      <Wrapper>
      <ToastContainer/>
      {Object.values(orderData).length > 0 && <OrderInfor orderData={orderData}/>}

      <div className="food_service_container">
        <PickFoodService orderId={id}/>
      </div>
      </Wrapper>
    </Container>
  );
};

const OrderInfor = (p) => {
  const { orderData } = p

  const[inforData, setInforData] = useState({})
  const [formState, setFormState] = useState({
    groom: orderData.groom,
    bride: orderData.bride,
    note: orderData.note,
    phone: orderData.phone,
    table_count: Number(orderData.table_count),
    wedding_date: new Date(orderData.wedding_date)
  });
  const fp = useRef(null);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      // const reqBody = {
      //   ...formState,
      //   table_count: Number(formState.table_count)
      // };
      // if (orderData.new_lobby_id) {
      //   reqBody.lobby_id = orderData.new_lobby_id;
      //   reqBody.wedding_date = orderData.wedding_date;
      //   reqBody.shift_id = orderData.Shift.id;
      // }
      // await editWedding(orderData.id, reqBody);
      // setOrderData({
      //   ...orderData,
      //   ...reqBody,
      // });
      // setModalClose();
    } catch (error) {
      alert(error.message);
    }
  };

  const formatDataInput = (data) => {
    const { bride, groom, note, table_count, Customer: { phone } } = data

    return { bride, groom, note, table_count, phone}
  }

  const handleChooseDate = (date) => {
    // setSearchParam({...searchParam, date: date[0] })
  }

  useEffect(() => {
    if(orderData) {
      setInforData(formatDataInput(orderData))
    }
  }, [orderData]);


  return (
   <OrderInforContainer>
      <div className="container">
        <div className="calendar">
          <div className="flat-picker-wrapper">
            <Flatpickr
              ref={fp}
              options={{
                  mode: "single",
                  inline: true
              }}
              value={formState.wedding_date}
              onChange={handleChooseDate}
              />
          </div>
        </div>
        <div className='customer_info'>
            {inforData && Object.keys(inforData).map((key, idx) =>{
              return (
                <InputFieldWrapper key={idx}>
                  <div className="title">{key}</div>
                  <Input value={inforData[key]} />
                </InputFieldWrapper>
              )
            }
            )}
        </div>
        <InputFieldWrapper>
          <div className="title">Lobby</div>
          <Input value={orderData.Lobby.name} />
          <TreeSelectLob />
          
        </InputFieldWrapper>

        <InputFieldWrapper>
          <div className="title">Shift</div>
          <Input value={orderData.Shift.name} />
        </InputFieldWrapper>

      </div>
      <div className="btn-wrapper">
        <button className="btn" onClick={handleSubmit}>
          save
        </button>
      </div>
   </OrderInforContainer>
  )
}

const TreeSelectLob = () => {
  const { TreeNode } = TreeSelect;
  const [value, setValue] = useState(undefined);
  const [lobTypes, setLobTypes] = useState([])

  const onChange = newValue => {
    setValue(newValue);
  };

  const fetchLobType = async () => {
    try {
      const res = await getLobbyTypes();
      const data = res.data;
      setLobTypes(data);
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    fetchLobType()
  }, []);

  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
    >
      {lobTypes && 
      lobTypes.map(lobType => {
        return (
          <TreeNode key={lobType.id} value={lobType.id} title={lobType.type_name} selectable={false}>
            {lobType.Lobby.map(lob => {
              return (
                <TreeNode key={lob.id} value={lob.id} title={lob.name} />
              )
            })}
          </TreeNode>)
      })}
    </TreeSelect>
  );
}

const Container = styled.div`
  height: 100vh;

  .food_service_container {
    width: 80%;
  }


`

const OrderInforContainer = styled.div`
  height: 100%;
  padding: 30px;
  width: 30%;
  background-color: white;
  overflow-y: scroll;

  .container {

    .calendar {
      margin-bottom: 20px;
      .flat-picker-wrapper {
        input.flatpickr-input {
          display: none!important;
        }
      }
    }

    .customer_info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;
    }
  }
`

const InputFieldWrapper = styled.div`
  width: 100%;
  padding: 10px 0;

  .title { 
    margin-bottom: 5px;
    font-size: 1rem;
    font-weight: 600;
  }
`

const Wrapper = styled.div`
height: 88vh;
width: 100%;
padding: 2.5rem;
display: flex;
 
`;

export default OrderID;

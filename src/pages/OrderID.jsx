import { useEffect, useState } from 'react';
import { FaPenToSquare } from 'react-icons/fa6';
import { Modal, DatePick, TextInput, TextRow } from '../components';
import { editOrderLeft, editOrderRight } from '../utils/orderRenderArr';
import { getWeddingById } from '../api/wedding.api';
import { truncateUUID } from '../utils';
import { useParams } from 'react-router-dom';
import { Header } from '../components';
import styled from 'styled-components';
import { Input } from 'antd';
import PickFoodService from '../components/Order/PickFoodService';


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
      {Object.values(orderData).length > 0 && <OrderInfor orderData={orderData}/>}

      <div className="food_service_container">
        <PickFoodService
            setModalClose={() => {}}
            setNextModalOpen={() => {}}
            type="food"
            orderId={id}
            setFoodData={() =>{}}
        />
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
  });

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

    return { bride, groom, note, table_count, phone }
  }

  useEffect(() => {
    if(orderData) {
      setInforData(formatDataInput(orderData))
    }
  }, [orderData]);


  return (
   <OrderInforContainer>
      <div className="container">
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

      </div>
      <div className="btn-wrapper">
        <button className="btn" onClick={handleSubmit}>
          save
        </button>
      </div>
   </OrderInforContainer>
  )
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
  width: 20%;
  background-color: white;

  .container {
    .customer_info {
      
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

import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { LobbyContext } from '../../pages/Lobby';
import { Icon } from '../../assets/icon';
import TypeTableEdit from './TypeTableEdit';
import TypeTable from './CreateTypeTable';
import { WrapTable } from './Styled';
import usePagination from "./Hooks/usePagination";
import { getLobbies } from '../../api/lobby.api';

const LobbyType = ({ data }) => {
  const {
    fetchLobType,
    setPageDisplay,
    setLobTypeInformationData
  } = useContext(LobbyContext);
  const [editData, setEditData] = useState();
  const [isLobTypeEditDisplay, setIsLobTypeEditDisplay] = useState(false);

  const testData = data ? data : [];
  const pagination = usePagination(testData, 9);

  const createArray = (n) => {
    const arr = [];
    for (let i = 1; i <= n; i++) arr.push(i);
    return arr;
  };

  const [maxPages, setMaxPages] = useState(() => createArray(pagination.totalPages + 1));

  const onNextPage = useCallback(() => {
    pagination.setPage(prevState => prevState < pagination.totalPages ? prevState + 1 : prevState);
  }, [pagination]);

  const onPrevPage = useCallback(() => {
    pagination.setPage(prevState => prevState > 0 ? prevState - 1 : prevState);
  }, [pagination]);

  const onPageChange = useCallback(index => {
    pagination.setPage(index);
  }, [pagination]);

  const handleEditButton = value => {
    setIsLobTypeEditDisplay(true);
    setEditData(value);
  };

  const handleLobTypeClick = (value) => {
    const id = value[0].replace(".", "").replace("0", "");
    const type = value[1];
    fetchLobTypeInformation(id, type);
    setPageDisplay({
      previousPage: "LobType",
      currentPage: "LobTypeInformation",
    });
  }

  const fetchLobTypeInformation = async (id, type) => {
    const res = await getLobbies("", id);
    const data = res.data;
    console.log(data)
    const tempData = [];
    data.map((value) => {
      const subData = []
      subData.push(
        value.lob_type_id < 10 ? "0" + value.lob_type_id + "." : value.lob_type_id + ".",
        value.name,
        type,
      )
      tempData.push(subData);
    })
    setLobTypeInformationData(tempData);
  }

  useEffect(() => {
    setMaxPages(createArray(pagination.totalPages + 1));
  }, [pagination.totalPages]);

  return (
    <Fragment>
      <WrapTable>
        <TypeTable
          data={pagination.data}
          handleEditButton={handleEditButton}
          handleLobTypeClick={handleLobTypeClick}
        />
        <div className='paginationButtonTable'>
          <div className='button previousButton' onClick={onPrevPage} >
            <Icon.leftarrow disabled={pagination.page <= 0}></Icon.leftarrow>
          </div>
          {maxPages.map((value, index) => (
            <div
              key={index}
              className='pageNumber'
              style={pagination.page === index ? { backgroundColor: "blue", color: "white" } : {}}
              onClick={() => onPageChange(index)}
            >
              {value}
            </div>
          ))}
          <div className='button nextButton' onClick={onNextPage} >
            <Icon.rightarrow disabled={pagination.page === pagination.totalPages}></Icon.rightarrow>
          </div>
        </div>
      </WrapTable>
      {isLobTypeEditDisplay && (
        <TypeTableEdit
          setIsLobTypeEditDisplay={setIsLobTypeEditDisplay}
          editData={editData}
          fetchLobType={fetchLobType}
        />
      )}
    </Fragment>
  );
};

export default LobbyType;

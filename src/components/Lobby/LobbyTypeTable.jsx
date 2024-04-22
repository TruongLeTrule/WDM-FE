import React, { useCallback, useContext, useEffect, useState } from 'react';
import { LobbyContext } from '../../pages/Lobby';
import { LobbyTypeTableStyled } from './Styled';
import { Icon } from '../../assets/icon';
import TypeTableEdit from './TypeTableEdit';
import TypeTable from './CreateTypeTable';
import usePagination from "./Hooks/usePagination";

const LobbyType = ({ data }) => {
  const { fetchLobType } = useContext(LobbyContext);
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

  useEffect(() => {
    setMaxPages(createArray(pagination.totalPages + 1));
  }, [pagination.totalPages]);

  return (
    <LobbyTypeTableStyled>
      <div className="wrapTable">
        <TypeTable
          className='lobbyTypeTable'
          data={pagination.data}
          handleEditButton={handleEditButton}
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
      </div>
      {isLobTypeEditDisplay && (
        <TypeTableEdit
          setIsLobTypeEditDisplay={setIsLobTypeEditDisplay}
          editData={editData}
          fetchLobType={fetchLobType}
        />
      )}
    </LobbyTypeTableStyled>
  );
};

export default LobbyType;

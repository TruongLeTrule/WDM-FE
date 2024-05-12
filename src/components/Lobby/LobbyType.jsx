import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { LobbyContext } from '../../pages/Lobby';
import TypeTableEdit from './TypeTableEdit';
import TypeTable from './components/CreateTypeTable';
import { WrapTable } from './Styled';
import usePagination from "./Hooks/usePagination";
import PagePagination from './PagePagination';
import TypeTableAdd from './TypeTableAdd';

const LobbyType = (p) => {
  const { data, isModalAddLT, LTmodalOption } = p
  const {
    fetchLobType,
    fetchLobby,
    setLobTypeData,
    setCurrentLT
  } = useContext(LobbyContext);
  const [editData, setEditData] = useState();
  const [isLobTypeEditDisplay, setIsLobTypeEditDisplay] = useState(false);
  const testData = data || [];
  const pagination = usePagination(testData, 9);

  const handleEditButton = (value) => {
    setIsLobTypeEditDisplay(true);
    setEditData(value);
  };

  const handleLobTypeClick = (value) => {
    console.log(value)
    setCurrentLT({id: value[0], name: value[1]})
    fetchLobby(value);
  };

  const handleGetLTID = (data) => {
    console.log(data)
  }

  return (
    <Fragment>
      <WrapTable>
        <TypeTable
          data={pagination.data}
          handleEditButton={handleEditButton}
          handleLobTypeClick={handleLobTypeClick}
        />
        <PagePagination pagination={pagination} handleGetLTID={handleGetLTID}/>
      </WrapTable>
      {isLobTypeEditDisplay && (
        <TypeTableEdit
          setIsLobTypeEditDisplay={setIsLobTypeEditDisplay}
          editData={editData}
          fetchLobType={fetchLobType}
        />
      )}

      {isModalAddLT && 
        <TypeTableAdd
          modalOption={LTmodalOption}
          editData={editData}
          fetchLobType={fetchLobType}
          
        />
      }
    </Fragment>
  );
};

export default LobbyType;

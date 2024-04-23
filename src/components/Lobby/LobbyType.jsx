import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { LobbyContext } from '../../pages/Lobby';
import TypeTableEdit from './TypeTableEdit';
import TypeTable from './utils/CreateTypeTable';
import { WrapTable } from './Styled';
import usePagination from "./Hooks/usePagination";
import PagePagination from './PagePagination';

const LobbyType = ({ data }) => {
  const {
    fetchLobType,
    fetchLobby,
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
    fetchLobby(value);
  };

  return (
    <Fragment>
      <WrapTable>
        <TypeTable
          data={pagination.data}
          handleEditButton={handleEditButton}
          handleLobTypeClick={handleLobTypeClick}
        />
        <PagePagination pagination={pagination} />
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

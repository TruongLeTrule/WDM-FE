import React, { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { LobbyContext } from '../../pages/Lobby';
import TypeTableEdit from './TypeTableEdit';
import TypeTable from './CreateTypeTable';
import { WrapTable } from './Styled';
import usePagination from "./Hooks/usePagination";
import { getLobbies } from '../../api/lobby.api';
import PagePagination from './PagePagination';

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

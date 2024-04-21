import React, { useCallback, useContext, useEffect, useState } from 'react';
import usePagination from "./Hooks/usePagination";
import { LobbyTypeTableStyled } from './Styled';
import { Icon } from '../../assets/icon';
import { LobbyContext } from '../../pages/Lobby';
import TypeTableEdit from './TypeTableEdit';

const LobbyTypeTable = ({ data }) => {
  const [editData, setEditData] = useState()
  const [isLobTypeEditDisplay, setIsLobTypeEditDisplay] = useState(false);
  const testData = data ? data : [];
  const pagination = usePagination(testData, 9);
  function createArray(n) {
    var arr = [];
    for (var i = 1; i <= n; i++) {
      arr.push(i);
    }
    return arr;
  }
  const [maxPages, setMaxPages] = useState(() => {
    return createArray(pagination.totalPages + 1);
  });
  const tableHead = ["ID", "Type", "Max table", "Min price", "Required Deposit", ""]
  const onNextPage = useCallback(() => {
    pagination.setPage((prevState) => {
      if (prevState < pagination.totalPages) {
        return prevState + 1;
      }
      return prevState;
    });
  }, [pagination]);

  const onPrevPage = useCallback(() => {
    pagination.setPage((prevState) => {
      if (prevState > 0) {
        return prevState - 1;
      }
      return prevState;
    });
  }, [pagination]);

  const onPageChange = useCallback((index) => {
    pagination.setPage(index);
  })

  const handleEditButton = (value) => {
    setIsLobTypeEditDisplay(true);
    console.log(editData);
    setEditData(value);
  }

  useEffect(() => {
    setMaxPages(createArray(pagination.totalPages + 1))
  }, [pagination.totalPages])
  return (
    <LobbyTypeTableStyled>
      <div className="wrapTable">
        <table className='lobbyTypeTable'>
          <thead>
            <tr>
              {tableHead.map((value, index) => {
                return <th key={index}>{value}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {pagination.data.map((value, index) => {
              return (
                <tr key={index}>
                  {
                    value.map((cell, cellIndex) => {
                      return (
                        <td key={cellIndex}>{cell}</td>
                      )
                    })
                  }
                  <td><Icon.more onClick={() => handleEditButton(value)}></Icon.more></td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className='paginationButtonTable'>
          <div className='button previousButton' onClick={onPrevPage} >
            <Icon.leftarrow disabled={pagination.page <= 0}></Icon.leftarrow>
          </div>
          {
            maxPages.map((value, index) => {
              return (
                <div
                  key={index}
                  className='pageNumber'
                  style={
                    pagination.page === index ?
                      { backgroundColor: "blue", color: "white" }
                      : {}
                  }
                  onClick={() => onPageChange(index)}
                >
                  {value}
                </div>
              );
            })
          }
          <div className='button nextButton' onClick={onNextPage} >
            <Icon.rightarrow disabled={pagination.page === pagination.totalPages}></Icon.rightarrow>
          </div>
        </div>
      </div>
      {
        isLobTypeEditDisplay &&
        <TypeTableEdit
          setIsLobTypeEditDisplay={setIsLobTypeEditDisplay}
          editData = {editData}
        />
      }
    </LobbyTypeTableStyled>
  );
}

export default LobbyTypeTable;

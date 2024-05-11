import { Fragment, createContext, useContext, useState } from "react";
import { WrapTable } from "./Styled";
import TypeInformTable from "./components/CreateTypeInformTable";
import usePagination from "./Hooks/usePagination";
import { LobbyContext } from "../../pages/Lobby";
import PagePagination from "./PagePagination";
import TypeInformTableEdit from "./TypeInformTableEdit";
import TypeInformTableAdd from "./TypeInformTableAdd";

export const TypeInformContext = createContext();

const LobTypeInformation = (p) => {
  const { data, isModalAdd, modalOption } = p
  const { fetchLobby } = useContext(LobbyContext);
  const [isLobTypeInformEditDisplay, setIsLobTypeInformEditDisplay] = useState(false);
  const [editData, setEditData] = useState([]);
  const testData = data || [];
  const pagination = usePagination(testData, 9);
  const shareValue = {
    editData,
    setEditData,
    setIsLobTypeInformEditDisplay,
    pagination, 
    fetchLobby
  }
  return (
    <TypeInformContext.Provider value={shareValue}>
      <Fragment>
        <WrapTable>
          <TypeInformTable />
          <PagePagination pagination={pagination} />
        </WrapTable>
        {isLobTypeInformEditDisplay &&
          <TypeInformTableEdit
          />}
        {isModalAdd &&
          <TypeInformTableAdd
          modalOption={modalOption}
          />}
          
      </Fragment>
    </TypeInformContext.Provider>
  );
};

export default LobTypeInformation;

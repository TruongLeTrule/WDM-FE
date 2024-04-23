import { Fragment, createContext, useContext, useState } from "react";
import { WrapTable } from "./Styled";
import TypeInformTable from "./utils/CreateTypeInformTable";
import usePagination from "./Hooks/usePagination";
import { LobbyContext } from "../../pages/Lobby";
import PagePagination from "./PagePagination";
import TypeInformTableEdit from "./TypeInformTableEdit";

export const TypeInformContext = createContext();

const LobTypeInformation = ({ data }) => {
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
      </Fragment>
    </TypeInformContext.Provider>
  );
};

export default LobTypeInformation;

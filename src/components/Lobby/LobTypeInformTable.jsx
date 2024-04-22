import { Fragment, useContext } from "react";
import { WrapTable } from "./Styled";
import TypeInformTable from "./utils/CreateTypeInformTable";
import usePagination from "./Hooks/usePagination";
import { LobbyContext } from "../../pages/Lobby";
import PagePagination from "./PagePagination";

const LobTypeInformation = ({ data }) => {
  const { } = useContext(LobbyContext);
  const testData = data || [];
  const pagination = usePagination(testData, 9);

  return (
    <Fragment>
      <WrapTable>
        <TypeInformTable data={pagination.data} />
        <PagePagination pagination={pagination} />
      </WrapTable>
    </Fragment>
  );
};

export default LobTypeInformation;

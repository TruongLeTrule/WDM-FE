import { Fragment, useContext } from "react";
import { WrapTable } from "./Styled";
import TypeInformTable from "./CreateTypeInformTable"
import usePagination from "./Hooks/usePagination";
import { LobbyContext } from "../../pages/Lobby";
const LobTypeInformation = ({
  data
}) => {
  const {
    setPageDisplay
  } = useContext(LobbyContext);
  const testData = data ? data : [];
  const pagination = usePagination(testData, 9);
  return (
    <Fragment>
      <WrapTable>
        <TypeInformTable
          data={pagination.data}
        />
      </WrapTable>
    </Fragment>
  )
}

export default LobTypeInformation;
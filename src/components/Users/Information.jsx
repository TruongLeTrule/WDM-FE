import styled from "styled-components"
const Information = ({ display, setIsDisplayInformationBlock }) => {
  return (
    <InformationBlock display={display.toString()}>
      <InformationBoard>
        <h4>Account Information</h4>
        <table className="boardInput">
          <tbody>
            <tr>
              <td className="informationTitle"><p>ID :</p> </td>
              <td><input></input></td>
            </tr>
            <tr>
              <td className="informationTitle"><p>Name :</p> </td>
              <td><input></input></td>
            </tr>
            <tr>
              <td className="informationTitle"><p>Username :</p> </td>
              <td><input></input></td>
            </tr>
            <tr>
              <td className="informationTitle"><p>Password :</p> </td>
              <td><input type="password"></input></td>
            </tr>
            <tr>
              <td className="informationTitle"><p>Permission :</p> </td>
              <td>
                <select>
                  <option value="">Select an option</option>
                  <option value="option1">Super Admin</option>
                  <option value="option2">Admin</option>
                  <option value="option3">Manager</option>
                  <option value="option4">Staff</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="cancelSaveCombination">
          <button className="cancelButton" onClick={() => setIsDisplayInformationBlock(false)}>Cancel</button>
          <button className="saveButton" onClick={() => setIsDisplayInformationBlock(false)}>Save</button>
        </div>
      </InformationBoard>
    </InformationBlock>
  )
}

export default Information;

const InformationBlock = styled.div`
  z-index: 2;
  position: fixed;
  top: 0; 
  left: 12%; 
  height: 100vh;
  width: 88%;
  background-color: rgb(0, 0, 0, 50%);
  display: ${props => props.display === "true" ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
`;

const InformationBoard = styled.div`
  width: 40%;
  height: 60%;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  justify-content: space-around;
  background-color: white;

h4{
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: end;
  font-weight: bold;
}

.boardInput{
  flex: 1;
  width: 100%;
  tr{
    .informationTitle{
     width : 35% ;
    }
  }
  td{
    p{
      height: 100%;
      display: flex;
      justify-content: end;
      align-items: center;
      font-size: 1.15em;
      font-weight: bold;
    }
    input{
      width: 65%;
      margin-left: 5% ;
      font-size: 1.15em;
      font-weight: bold;
      border-bottom: 1px black solid;
    }
    select{
      margin-left: 5%;
      width: 65%;
      border-radius: 5px;
      font-size: 1.15em;
    }
  }
}

  .cancelSaveCombination{
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    button{
      width: 15%;
      height: 50%;
      border-radius: 12px;
      color: white;
      &:hover{
        cursor: pointer;
      }
    }
    .cancelButton{
      background-color: #c4c4c4;
      margin-left: 2%;
    }
    .saveButton{
      background-color: #1814f3;
      margin-right: 2%;
    }
  }
`
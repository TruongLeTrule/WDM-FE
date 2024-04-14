import styled from "styled-components"
import { AccountInformationTable } from "./AccountInformationTable";
import { PermissonAccountTable } from "./PermissonAccountTable";

export const Checkbox = styled.input`
  outline: none;
  width: 25px;
  height: 25px;
  color: red;
  &:hover{
    cursor: pointer;
  }
`

export const UserBlock = styled.div`
  user-select: none;
  background-color: white;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  .blockTitle {
    width: 100%;
    height: 8vh;
    padding-left: 2%;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
  .TitleSearchCombination{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 5%;
  }
`;

export const StyledPermissionAccountTable = styled(PermissonAccountTable)`
  table-layout: fixed;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  tr{
    height: 7vh;
  }
  th{
    width: auto;
    text-align: center;
    font-size: 1.5em;
    color: #718ebf;
  }
  td{
    width: auto;
    text-align: center;
    font-size: 1.25em;
  }
`;

export const StyledAccountInformationTable = styled(AccountInformationTable)`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-right: 5%;
  tr{
    height: 7vh;
  }
  th{
    width: auto;
    text-align: center;
    font-size: 1.5em;
    color: #718ebf;
  }
  td{
    width: auto;
    text-align: center;
    font-size: 1.25em;
  }
  .pencilIcon{
    &:hover{
      cursor: pointer;
    }
  }
  .deleteIcon{
    &:hover{
      cursor: pointer;
    }
  }
`;

export const CreateSaveCombination = styled.div`
  height: 9vh;
  display: flex;
  padding-left: 5%;
  padding-right: 5%;
  justify-content: space-between;
  align-items: center;
  button{
    width: 10%;
    height: 50%;
    border-radius: 15px;
    color: white;
    font-size: 15px;
    &:hover{
      cursor: pointer;
    }
  }
  .createButton{
    background-color: gray;
  }
  .saveButton{
    background-color: blue;
  }
`


export const InformationBlock = styled.div`
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

export const InformationBoard = styled.div`
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
`;

import styled from "styled-components"
import { AccountInformationTable } from "./AccountInformationTable";
import { PermissonAccountTable } from "./PermissonAccountTable";;

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
  background-color: white;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  .blockTitle {
    width: 100%;
    height: 8vh;
    padding-left: 2%;
    display: flex;
    align-items: center;
  }
  .blockTitle{
      .title{
        font-weight: 600;
      }
      .plus{
        height: 100%;
        display: flex;
        justify-content: left;
        align-items: center;
        margin-left: 10px;
        &:hover{
          cursor: pointer;
        }
        svg{
          height: 35px;
          width: 35px;
        }
      }
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
  width: 85vw;
  margin-top: 20px;
  margin-bottom: 20px;
  border-collapse: separate; 
  border-spacing: 10px; 
  tr{
    height: 7vh;
  }
  th{
    width: auto;
    max-width: 20vw;
    text-align: center;
    font-size: 1.5em;
    color: #718ebf;
  }
  td{
    width: auto;
    max-width: 20vw;
    overflow: hidden;
    white-space: nowrap; 
    text-overflow: ellipsis;
    text-align: center;
    font-size: 1.25em;
  }
  .pencilIcon{
    width: 3vw;
    &:hover{
      cursor: pointer;
    }
  }
  .deleteIcon{
    width: 3vw;
    &:hover{
      cursor: pointer;
    }
  }
`;

export const InformationBlock = styled.div`
  display: ${props => props.display === "true" ? 'flex' : 'none'};
  z-index: 2;
  position: fixed;
  top: 0; 
  left: 10%; 
  height: 100vh;
  width: 90%;
  background-color: rgb(0, 0, 0, 50%);
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
/*     .saveButton{
      background-color: ${(props) => (props.disabled ? 'gray' : 'blue')};
      margin-right: 2%;
    } */
  }
`;

export const SaveButton = styled.button`
      background-color: ${(props) => (props.disabled ? 'gray' : 'blue')};
      margin-right: 2%;
`

export const PermissionBlock = styled.div`
  display: ${(props) => props.display};
  z-index: 2;
  position: fixed;
  top: 0; 
  left: 10%; 
  height: 100vh;
  width: 90%;
  background-color: rgb(0, 0, 0, 50%);
  justify-content: center;
  align-items: center;
`

export const PermissionForm = styled.div`
  width: 40%;
  height: 30%;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  .formTitle{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30%;
    font-weight: bold;
  }
`
export const PermissionInput = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .inputTitle{
    display: flex;
    justify-content: end;
    align-items: center;
    width: 30%;
    font-size: 1.5em;
    font-weight: bold;
  }
  .input{
    width: 70%;
    display: flex;
    justify-content: start;
    align-items: center;
    padding-left: 3%;
    input{
      width: 80%;
      border-bottom: 1px gray solid;
      font-size: 1.5em;
      font-weight: bold;
    }
  }
`

export const PermissionCancelandSave = styled.div`
  display: flex;
  height: 40%;
  justify-content: space-around;
  align-items: center;
  button{
    width: 20%;
    height: 50%;
    border-radius: 10px;
    font-size: 1em;
    &:hover{
      cursor: pointer;
    }
  }
  .buttonCancel{
    color: white;
    background-color: gray;
  }
  .buttonSave{
    color: white;
    background-color: blue;
  }
`
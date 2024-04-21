import styled from "styled-components"

export const LobbyBlock = styled.div`
  height: 100%;
`

export const LobbyContent = styled.div`
  width: 90%;
  height: 100%;
`

export const LobbyTypeTableStyled = styled.div`
  width: 100%;
  height: 88vh;
  background-color: #f5f7fa;
  padding: 2%;
  .wrapTable{
    background-color: white;
    height: 100%;
    display: flex; 
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    padding-bottom: 1%;
    .lobbyTypeTable{
      table-layout: fixed;
      width: 100%;
      padding-top: 1%;
      tr{
        height: 7vh;
        &:hover{
          cursor: pointer;
        }
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
    }
    .paginationButtonTable{
      user-select: none;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .button{
        display: flex;
        justify-content: center;
        align-items: center;
        svg{
          width: 30px;
          height: 30px;
        }
        &:hover{
          cursor: pointer;
        }
      }
      .pageNumber{
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid gray;
        margin-left: 0.5%;
        margin-right: 0.5%;
        border-radius: 3px;
        &:hover{
          cursor: pointer;
        }
      }
    }
  }
`
import styled from "styled-components";

export const TableWrap = styled.div`
  width: 100%;
  height: 100%;
  table {
    width: 100%;
    border-collapse: collapse;
  }
  tr {
    border-bottom: solid 1px black;
  }

  tr:nth-child(2n){
    background: #ffffdd;
  }
  
`;
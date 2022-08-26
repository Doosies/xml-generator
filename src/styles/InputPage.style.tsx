import styled from "styled-components";

export const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
`;
export const TextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 88%;
`;
export const Button = styled.button`
  width: 100%;
  height: 10%;
  margin-top: 2%;
  background: white;
  border: 1px solid black;

  &:hover {
    background: #f4f4f4;
  }
  &:active {
    background: #ebebeb;
  }
`;
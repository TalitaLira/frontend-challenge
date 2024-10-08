import { styled } from "styled-components";

export const FieldsWrapper = styled.div`
  width: 80%;
  margin: 20px auto;
  position: relative;
  > label {
    display: flex;
    > input {
      margin-right: 10px;
      width: initial;
    }
  }
`;

export const DropdownWrapper = styled.div`
  width: 80%;
  margin: 10px auto;
  > select {
    padding: 10px 5px;
    width: 100%;
    font-size: 14px;
  }
`;
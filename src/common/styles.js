import { styled } from "styled-components";
import { CircularProgress } from '@mui/material';

export const Spinner = styled(CircularProgress)`
  margin: 0 auto;
  display: block !important;
`;

export const FormWrapper = styled.div`
  display: block;
  margin: 20% auto;
  border: 1px solid black;
  max-width: 450px;
  width: 100%;
  padding: 10px;
  overflow: hidden;
  box-sizing: border-box;
`;

export const FormTitle = styled.h1`
  font-size: 25px;
  text-align: center;
  margin-bottom: 30px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin: 30px auto 10px auto;
  width: 80%;
  position: relative;
`;

export const Button = styled.button`
  padding: 5px 10px;
  background-color: #fff;
  border: 1px solid black;
  font-size: 16px;
  cursor: pointer;
`;

export const FormValidationMessage = styled.p`
  font-size: 13px;
  text-align: center;
  color: #FF0000;
  font-weight: 200;
`;
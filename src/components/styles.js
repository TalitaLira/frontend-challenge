import { styled } from "styled-components";
import { Field } from 'formik';

export const FormWrapper = styled.div`
  display: block;
  margin: 20% auto;
  border: 1px solid black;
  max-width: 450px;
  width: 100%;
  padding: 10px;
  overflow: hidden;
`;

export const FormTitle = styled.h1`
  font-size: 25px;
  text-align: center;
  margin-bottom: 30px;
`;

export const FormField = styled(Field)`
  display: block;
  padding: 10px 5px;
  margin: 10px auto;
  width: 80%;
  overflow: hidden;
  font-size: 14px;
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
`;

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

export const InformativeText = styled.p`
  font-size: 18px;
  text-align: center;
  margin-bottom: 40px;
`;
// src/pages/CalculatorPage/Calculator.styled.js

import styled from 'styled-components';

export const Container = styled.div`
  background: #264061; 
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 78px) {
    height: 100%;
  gap: 15px;
  align-items: stretch; 
    justify-content: center; 
  }
  @media screen and (min-width: 1280px) {
    flex-direction: row;
    height: 700px;
  gap: 15px;
  align-items: stretch; /* Make children have the same height */
    justify-content: center; /* Center children horizontally */
  }
`;

export const DiaryWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  @media screen and (min-width: 1280px) {
    height: 572px;
  }
`;

export const WrapCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

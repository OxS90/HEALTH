import React from 'react';
import { Container } from '../CalculatorPage/Calculator.styled';
import CalculatorForm from '../../components/CalculatorForm/CalculatorForm';
import { CalculatorWrap } from '../../components/CalculatorWrap/CalculatorWrap';

const CalculatorPage = () => {
  console.log('CalculatorPage component rendered');
  return (
    <Container>
      <CalculatorForm />
      <CalculatorWrap />
    </Container>
  );
};

export default CalculatorPage;


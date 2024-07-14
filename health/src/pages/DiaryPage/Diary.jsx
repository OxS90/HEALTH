import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CalculatorWrap } from '../../components/CalculatorWrap/CalculatorWrap';
import {
  Container,
  DiaryWrapper,
  WrapCont,
} from '../CalculatorPage/Calculator.styled';
import { DiaryDateCalendar } from '../../components/DiaryDateCalendar/DiaryDateCalendar';
import { DiaryAddProductForm } from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import { DiaryProductsList } from '../../components/DiaryProductsList/DiaryProductsList';
import { getDayInfo } from '../../redux/diary/operations';
import { selectDate } from '../../redux/diary/selectors';

const DiaryPage = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectDate);

  useEffect(() => {
    if (date) {
      dispatch(getDayInfo(date));
    }
  }, [date, dispatch]);

  console.log('DiaryPage component rendered');
  return (
    <Container>
      <WrapCont>
        <DiaryWrapper>
          <DiaryDateCalendar />
          <DiaryAddProductForm />
          <DiaryProductsList />
        </DiaryWrapper>
      </WrapCont>
      <CalculatorWrap />
    </Container>
  );
};

export default DiaryPage;


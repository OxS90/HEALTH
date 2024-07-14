// src/components/Calculator/CalculatorWrap.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDayInfo } from '../../redux/diary/operations';
import {
  selectDate,
  selectEatenProducts,
  selectSummary,
} from '../../redux/diary/selectors';
import {
  selectNotAllowedProducts,
} from '../../redux/calculator/selectors';
import {
  CaloriesEl,
  CaloriesText,
  CaloriesTitle,
  CaloriesTitleFood,
  Section,
  SectionSummary,
  Wrapper,
} from './CalculatorWrap.styled';

export const CalculatorWrap = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectDate);
  const eatenProducts = useSelector(selectEatenProducts);
  const userSummary = useSelector(selectSummary);
  const notAllowedProducts = useSelector(selectNotAllowedProducts);

  useEffect(() => {
    if (date) {
      const formattedDate = new Date(date).toISOString().split('T')[0];
      console.log('Dispatching getDayInfo with date:', formattedDate);
      dispatch(getDayInfo(formattedDate));
    }
  }, [dispatch, date]);

  const notAllowedProductsToDisplay = notAllowedProducts.slice(0, 4);

  return (
    <Section>
      <h2 style={{ display: 'none' }}>Summary</h2>
      <Wrapper>
        <SectionSummary>
          <CaloriesTitle>Summary for {date}</CaloriesTitle>
          <CaloriesEl>
            <CaloriesText>Left</CaloriesText>
            <CaloriesText>
              {userSummary?.kcalLeft ? Math.round(userSummary.kcalLeft) : '000'}{' '}
              kcal
            </CaloriesText>
          </CaloriesEl>
          <CaloriesEl>
            <CaloriesText>Consumed</CaloriesText>
            <CaloriesText>
              {userSummary?.kcalConsumed
                ? Math.round(userSummary.kcalConsumed)
                : '000'}{' '}
              kcal
            </CaloriesText>
          </CaloriesEl>
          <CaloriesEl>
            <CaloriesText>Daily rate</CaloriesText>
            <CaloriesText>
              {userSummary?.dailyRate
                ? Math.round(userSummary.dailyRate)
                : '000'}{' '}
              kcal
            </CaloriesText>
          </CaloriesEl>
          <CaloriesEl>
            <CaloriesText>% of normal</CaloriesText>
            <CaloriesText>
              {userSummary?.percentsOfDailyRate
                ? Math.round(userSummary.percentsOfDailyRate)
                : '00'}
              %
            </CaloriesText>
          </CaloriesEl>
        </SectionSummary>
        <section>
          <CaloriesTitleFood>Food not recommended</CaloriesTitleFood>
          {notAllowedProductsToDisplay?.length > 0 ? (
            notAllowedProductsToDisplay.map((prod, index) => (
              <CaloriesText key={index}>{prod}</CaloriesText>
            ))
          ) : (
            <CaloriesText>Your diet will be displayed here</CaloriesText>
          )}
        </section>
      </Wrapper>
    </Section>
  );
};

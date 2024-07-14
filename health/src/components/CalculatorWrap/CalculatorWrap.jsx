import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDayInfo } from '../../redux/diary/operations'; // Make sure this is the correct path
import { getUserDailyRate } from '../../redux/calculator/operations'; // Import from the correct path
import {
  selectDate,
  selectEatenProducts,
  selectSummary,
  selectNotAllowedProducts,
} from '../../redux/diary/selectors';
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

  useEffect(() => {
    console.log('Fetching user daily rate');
    dispatch(getUserDailyRate());
  }, [dispatch]);

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
          {notAllowedProducts?.length > 0 ? (
            notAllowedProducts.slice(0, 4).map((prod) => (
              <CaloriesText key={prod}>{prod}</CaloriesText>
            ))
          ) : (
            <CaloriesText>Your diet will be displayed here</CaloriesText>
          )}
        </section>
      </Wrapper>
    </Section>
  );
};

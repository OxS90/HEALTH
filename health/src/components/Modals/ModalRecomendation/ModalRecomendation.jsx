import React from 'react';
import Loader from '../../../components/loader';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUserDailyRate,
  selectNotAllowedProducts,
  selectIsCalculatorLoading,
} from '../../../redux/calculator/selectors';
import { closeModal } from '../../../redux/global/slice';
import {
  BoxKcal,
  ButtonStart,
  ItemNotAllowed,
  Kcal,
  ListNotAllowed,
  SpanKcal,
  StyledNavLink,
  TextNotAllowed,
  Title,
  TitleNotAllowed,
  Wrapper,
} from './ModalRecommendation.styled';
import { selectIsLoggedIn } from '../../../redux/auth/selectors';

const ModalRecommendation = () => {
  const dailyRate = useSelector(selectUserDailyRate);
  const notAllowedProducts = useSelector(selectNotAllowedProducts);
  const isLoading = useSelector(selectIsCalculatorLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const closeModalRecommendation = () => dispatch(closeModal());

  const notAllowedProductsFiltered = notAllowedProducts?.slice(0, 4);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Wrapper>
          <Title>Your recommended daily calorie intake is</Title>
          <BoxKcal>
            <Kcal>
              {dailyRate && Math.round(dailyRate)}
              <SpanKcal> kcal </SpanKcal>
            </Kcal>
            <TitleNotAllowed>Foods you should not eat</TitleNotAllowed>
            <ListNotAllowed>
              {notAllowedProductsFiltered?.length > 0 &&
                notAllowedProductsFiltered.map((prod) => (
                  <ItemNotAllowed key={prod}>
                    <TextNotAllowed>{prod}</TextNotAllowed>
                  </ItemNotAllowed>
                ))}
            </ListNotAllowed>
          </BoxKcal>
          <ButtonStart type="button" onClick={closeModalRecommendation}>
            <StyledNavLink to={isLoggedIn ? '/diary' : '/login'}>
              Start losing weight
            </StyledNavLink>
          </ButtonStart>
        </Wrapper>
      )}
    </>
  );
};

export default ModalRecommendation;

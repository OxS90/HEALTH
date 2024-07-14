import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEatenProduct, getDayInfo } from '../../redux/diary/operations';
import {
  selectDate,
  selectDayInfo,
  selectEatenProducts,
} from '../../redux/diary/selectors';

import {
  Calorie,
  DelBtn,
  LiStyle,
  Title,
  UlStyled,
  UlWrapper,
  Weight,
} from './DiaryProductList.styled';
import closeIcon from '../../assets/closeDiary.svg';

export const DiaryProductsList = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectDate);
  const dayInfo = useSelector(selectDayInfo);
  const eatenProducts = useSelector(selectEatenProducts);

  useEffect(() => {
    if (date) {
      console.log('Fetching day info for date:', date);
      dispatch(getDayInfo(date));
    }
  }, [date, dispatch]);

  useEffect(() => {
    console.log('Component mounted or updated');
    console.log('Day Info: ', dayInfo);
    console.log('Date: ', date);
    console.log('Eaten Products: ', eatenProducts);
  }, [dayInfo, date, eatenProducts]);

  const deleteProductId = (e) => {
    const eatenProductId = e.target.id;

    console.log('Deleting product with ID: ', eatenProductId);

    dispatch(deleteEatenProduct(eatenProductId))
      .unwrap()
      .then(() => {
        console.log('Product deleted, fetching updated day info');
        if (date) {
          dispatch(getDayInfo(date));
        }
      })
      .catch((error) => {
        console.error('Error deleting product: ', error);
      });
  };

  return (
    <UlWrapper>
      <UlStyled>
        {eatenProducts?.length > 0 &&
          eatenProducts.map(({ _id, productTitle, weight, calories }) => (
            <LiStyle key={_id}>
              <Title>{productTitle}</Title>
              <Weight>{weight} g</Weight>
              <Calorie>{Math.round(calories)} kcal</Calorie>
              <DelBtn id={_id} type="button" onClick={deleteProductId}>
                <img src={closeIcon} alt="close" id={_id} />
              </DelBtn>
            </LiStyle>
          ))}
      </UlStyled>
    </UlWrapper>
  );
};

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEatenProduct, getDayInfo, searchProducts } from '../../redux/diary/operations';
import { selectDate, selectSearchedProducts } from '../../redux/diary/selectors';
import { AddBtn, AddTitleInput, AddWeightInput, Wrap } from './DiaryAddProductForm.styled';
import { format } from 'date-fns';
import AddDiary from '../../assets/addDiary.svg';

export const DiaryAddProductForm = () => {
  const dispatch = useDispatch();
  const [weight, setWeight] = useState('');
  const [title, setTitle] = useState('');
  const products = useSelector(selectSearchedProducts);
  const date = useSelector(selectDate);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (title.length >= 2) {
      dispatch(searchProducts(title));
    }
  }, [dispatch, title]);

  const handleChangeProduct = (e) => {
    const { value } = e.currentTarget;
    setTitle(value);

    const product = products.find((prod) => prod.title === value);
    if (product) {
      setSelectedProduct(product);
    } else {
      setSelectedProduct(null);
    }
  };

  const handleChangeWeight = (e) => {
    const { value } = e.currentTarget;
    setWeight(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct || !weight || !date) {
      console.error('Please select a product, enter weight, and select a date.');
      return;
    }

    const caloriesPerGram = selectedProduct.calories / selectedProduct.weight;
    const totalCalories = caloriesPerGram * parseFloat(weight);

    const newProduct = {
      date: format(new Date(date), 'yyyy-MM-dd'),
      productId: selectedProduct._id,
      productTitle: selectedProduct.title,
      weight: parseFloat(weight),
      calories: totalCalories,
    };

    try {
      await dispatch(addEatenProduct(newProduct)).unwrap();
      await dispatch(getDayInfo({ date: format(new Date(date), 'yyyy-MM-dd') }));
      reset();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const reset = () => {
    setTitle('');
    setWeight('');
    setSelectedProduct(null);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Wrap>
        <AddTitleInput
          onChange={handleChangeProduct}
          type="text"
          name="title"
          value={title}
          placeholder="Enter product name"
          list="listProducts"
          required
        />
        <datalist id="listProducts">
          {products?.length > 0 &&
            products.map((prod) => (
              <option key={prod._id} value={prod.title} />
            ))}
        </datalist>

        <AddWeightInput
          onChange={handleChangeWeight}
          type="number"
          name="weight"
          value={weight}
          placeholder="Grams"
          required
        />

        <AddBtn type="submit">
          <img src={AddDiary} alt="Add button" />
        </AddBtn>
      </Wrap>
    </form>
  );
};

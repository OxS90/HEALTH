import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { calculatePublicDailyRate, calculateUserDailyRate } from '../../redux/calculator/operations';
import { selectIsLoggedIn, selectUserId } from '../../redux/auth/selectors';
import { openModalRecommendations } from '../../redux/global/slice';
import {
  LabelTitle,
  Input,
  InputRadio,
  Button,
  Form,
  RadioBox,
  LabelRadio,
  Title,
  InputsWrapper,
  InputsRight,
  InputsLeft,
  TitleBloor,
  Wrapper,
} from './CalculatorForm.styled';
import { Error } from '../RegisterForm/RegisterForm.styled';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  height: yup
    .number()
    .typeError('Must be a number')
    .min(100, 'Minimum value is 100 cm')
    .max(220, 'Maximum value is 220 cm')
    .required('Required field'),
  age: yup
    .number()
    .typeError('Must be a number')
    .min(18, 'Minimum value is 18 years')
    .max(90, 'Maximum value is 90 years')
    .required('Required field'),
  weight: yup
    .number()
    .typeError('Must be a number')
    .min(45, 'Minimum value is 45 kg')
    .max(200, 'Maximum value is 200 kg')
    .required('Required field'),
  desiredWeight: yup
    .number()
    .typeError('Must be a number')
    .min(40, 'Minimum value is 40 kg')
    .max(200, 'Maximum value is 200 kg')
    .required('Required field'),
  bloodType: yup
    .number()
    .typeError('Required field')
    .oneOf([1, 2, 3, 4], 'Invalid blood type')
    .required('Required field'),
});

const CalculatorForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const onSubmit = data => {
    if (isLoggedIn) {
      dispatch(calculateUserDailyRate(data));
      navigate('/diary');
    } else {
      dispatch(calculatePublicDailyRate(data));
    }
  };

  const openModal = () => {
    dispatch(openModalRecommendations());
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Wrapper>
        <Title>Calculate your daily calorie intake right now</Title>
        <InputsWrapper>
          <InputsLeft>
            <LabelTitle>
              <Input
                type="number"
                {...register('height')}
                placeholder="Height *"
              />
            </LabelTitle>
            {errors?.height && (
              <Error style={{ top: '20%' }}>{errors.height.message}</Error>
            )}
            <LabelTitle>
              <Input type="number" {...register('age')} placeholder="Age *" />
            </LabelTitle>
            {errors?.age && (
              <Error style={{ top: '62%' }}>{errors.age.message}</Error>
            )}
            <LabelTitle>
              <Input
                type="number"
                {...register('weight')}
                placeholder="Current weight *"
              />
            </LabelTitle>
            {errors?.weight && (
              <Error style={{ top: '102%' }}>{errors.weight.message}</Error>
            )}
          </InputsLeft>
          <InputsRight>
            <LabelTitle>
              <Input
                type="number"
                {...register('desiredWeight')}
                placeholder="Desired weight *"
              />
            </LabelTitle>
            {errors?.desiredWeight && (
              <Error style={{ top: '20%' }}>
                {errors.desiredWeight.message}
              </Error>
            )}
            <TitleBloor> Blood type * </TitleBloor>

            <RadioBox>
              <LabelRadio>
                <InputRadio
                  {...register('bloodType')}
                  type="radio"
                  value="1"
                />
                1
              </LabelRadio>
              <LabelRadio>
                <InputRadio
                  {...register('bloodType')}
                  type="radio"
                  value="2"
                />
                2
              </LabelRadio>
              <LabelRadio>
                <InputRadio
                  {...register('bloodType')}
                  type="radio"
                  value="3"
                />
                3
              </LabelRadio>
              <LabelRadio>
                <InputRadio
                  {...register('bloodType')}
                  type="radio"
                  value="4"
                />
                4
              </LabelRadio>
            </RadioBox>
            {errors?.bloodType && (
              <Error style={{ top: '56%', width: '250px' }}>
                {errors.bloodType.message}
              </Error>
            )}
          </InputsRight>
        </InputsWrapper>
      </Wrapper>
      <Button type="submit" onClick={openModal}>
        Start losing weight
      </Button>
    </Form>
  );
};

export default CalculatorForm;

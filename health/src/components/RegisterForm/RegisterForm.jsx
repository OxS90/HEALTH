import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/operations';
import { useState } from 'react';

import {
  Section,
  Content,
  FormBox,
  Label,
  Input,
  ButtonsList,
  Button,
  ButtonActive,
  StyledNavLink,
  Error,
  Ribbon,
  Title,
} from './RegisterForm.styled';

import css from './Ribbon.module.css';

const RegisterForm = () => {
  const schema = yup
  .object({
    name: yup
      .string()
      .required('Enter your name')
      .min(3, 'The name must be at least 3 characters long')
      .max(254, 'The name must be at most 254 characters long'),
    email: yup
      .string()
      .email()
      .required('Enter an email address')
      .min(3)
      .max(254),
    password: yup
      .string()
      .required('Enter a password')
      .min(8, 'The password must be at least 8 characters long')
      .max(100, 'The password must be at most 100 characters long'),
  })
  .required();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = ({ name, email, password }) => {
    dispatch(registerUser({ name, email, password }));

    reset();
  };
  const [ribbon, setRibbon] = useState('');

  const handleChange = event => {
    const { value } = event.target;
    let score = 0;

    if (value.length > 5 && value.match(/[0-9]/g)) {
      score += 1;
    }

    if (value.length > 5 && value.match(/[a-z]/g)) {
      score += 1;
    }

    if (value.length > 5 && value.match(/[A-Z]/g)) {
      score += 1;
    }

    if (value.length > 5 && value.match(/[!@$%&*?_=/|#-().^+]/g)) {
      score += 1;
    }

    switch (score) {
      case 0:
        setRibbon('shortPass');
        break;

      case 1:
        setRibbon('easyPass');
        break;

      case 2:
        setRibbon('mediumPass');
        break;

      case 3:
        setRibbon('longPass');
        break;

      case 4:
        setRibbon('strongPass');
        break;

      default:
        break;
    }
  };

  return (
    <Section>
      <Content>
        <Title>Register</Title>
        <FormBox onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Label>
            <Input type="text" {...register('name')} placeholder="Name *" />
          </Label>
          {errors?.name && (
            <Error style={{ top: '11%' }}>{errors.name.message}</Error>
          )}
          <Label>
            <Input type="email" {...register('email')} placeholder="E-mail *" />
          </Label>
          {errors?.email && (
            <Error style={{ top: '33%' }}>{errors.email.message}</Error>
          )}
          <Label>
            <Input
              {...register('password')}
              placeholder="Password *"
              type={'password'}
              onChange={handleChange}
            />
            <Ribbon>
              <div className={css[ribbon]} />
            </Ribbon>
          </Label>
          {errors?.password && (
            <Error style={{ top: '57%' }}>{errors.password.message}</Error>
          )}
          <ButtonsList>
            <ButtonActive type="submit">Register</ButtonActive>
            <Button type="submit">
              <StyledNavLink to={'/login'}>Log in</StyledNavLink>
            </Button>
          </ButtonsList>
        </FormBox>
      </Content>
    </Section>
  );
};

export default RegisterForm;

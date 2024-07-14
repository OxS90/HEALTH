import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/auth/operations';
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
  Title,
} from "../RegisterForm/RegisterForm.styled"

const LoginForm = () => {

  const schema = yup
  .object({
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

  const onSubmit = ({ email, password }) => {
    dispatch(loginUser({ email, password }));

    reset();
  };

  return (
    
    <Section>
      <Content>
        <Title>Log In</Title>
        <FormBox onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Label>
            <Input
              type="email"
              {...register('email')}
              placeholder="E-mail *"
            />
          </Label>
          {errors?.email && (
            <Error style={{ top: '14%' }}>{errors.email.message}</Error>
          )}
          <Label>
            <Input
              type={'password'}
              {...register('password')}
              placeholder="Password *"
            />
          </Label>
          {errors?.password && (
            <Error style={{ top: '42%' }}>{errors.password.message}</Error>
          )}
          <ButtonsList>
            <ButtonActive type="submit">Log in</ButtonActive>
            <Button type="submit">
              <StyledNavLink to={'/register'}>
              Register
              </StyledNavLink>
            </Button>
          </ButtonsList>
        </FormBox>
      </Content>
    </Section>
  );
};

export default LoginForm;

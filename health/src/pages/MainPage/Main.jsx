import { selectIsLoggedIn } from '../../redux/auth/selectors';
import CalculatorForm from '../../components/CalculatorForm/CalculatorForm';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Wrapper } from './MainPage.styled';

const MainPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  console.log('MainPage - isLoggedIn:', isLoggedIn);

  return (
    <>
      {!isLoggedIn ? (
        <Wrapper>
          <Container>
            <CalculatorForm />
          </Container>
        </Wrapper>
      ) : (
        <Navigate to="/diary" />
      )}
    </>
  );
};

export default MainPage;

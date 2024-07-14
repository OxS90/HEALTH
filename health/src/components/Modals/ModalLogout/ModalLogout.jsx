import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../redux/auth/operations'; 
import { closeModal } from '../../../redux/global/slice';
import { useNavigate } from 'react-router-dom';
import { selectToken } from '../../../redux/auth/selectors';
import { useEffect } from 'react';
import {
  Wrapper,
  Content,
  Question,
  ButtonsList,
  Button,
} from './ModalLogout.styled';

const ModalLogout = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const closeModalLogout = () => dispatch(closeModal());

  const handleLogout = async () => {
    console.log('Logging out...');
    try {
      await dispatch(logoutUser()).unwrap(); // Ensure the correct name is used here
      console.log('Logout successful');
      closeModalLogout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    console.log('Token changed:', token);
    if (token === null) {
      console.log('Token is null, navigating to login');
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <Wrapper>
      <Question>Are you sure you want to log out?</Question>
      <Content>
        <ButtonsList>
          <Button type="button" onClick={handleLogout}>
            Log out
          </Button>
          <Button type="button" onClick={closeModalLogout}>
            Cancel
          </Button>
        </ButtonsList>
      </Content>
    </Wrapper>
  );
};

export default ModalLogout;

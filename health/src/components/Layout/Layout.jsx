import { Header } from '../Header/Header';
import { ModalContainer } from '../Modals/ModalContainer/ModalContainer';
import ModalLogout from '../Modals/ModalLogout/ModalLogout';
import ModalRecommendation from '../Modals/ModalRecomendation/ModalRecomendation';
import { useSelector } from 'react-redux';
import {
  selectIsModalLogoutOpen,
  selectIsModalRecommendationsOpen,
} from '../../redux/global/selectors';

const Layout = ({ children }) => {
  const isModalLogoutOpen = useSelector(selectIsModalLogoutOpen);
  const isModalRecommendationOpen = useSelector(selectIsModalRecommendationsOpen);
  
  return (
    <div>
      <Header />
      {children}
      {isModalLogoutOpen && (
        <ModalContainer>
          <ModalLogout />
        </ModalContainer>
      )}
      {isModalRecommendationOpen && (
        <ModalContainer>
          <ModalRecommendation />
        </ModalContainer>
      )}
    </div>
  );
};

export default Layout;


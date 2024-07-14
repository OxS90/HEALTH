import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsRefreshing } from '../redux/auth/selectors';

const PrivateRoute = ({ children, redirectPath = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  console.log('PrivateRoute:', { isLoggedIn, isRefreshing }); // Debugging logs

  return isLoggedIn && !isRefreshing ? (
    children
  ) : (
    <Navigate to={redirectPath} replace={true} />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectPath: PropTypes.string.isRequired,
};

export default PrivateRoute;

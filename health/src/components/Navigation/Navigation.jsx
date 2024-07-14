import React from 'react';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import { NavList, NavLinkStyled, NavListMenu } from './Navigation.styled';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav>
      {isLoggedIn ? (
        <NavListMenu>
          <li>
            <NavLinkStyled to={'/diary'}>Diary</NavLinkStyled>
          </li>
          <li>
            <NavLinkStyled to={'/calculator'}>Calculator</NavLinkStyled>
          </li>
        </NavListMenu>
      ) : (
        <NavList>
          <li>
            <NavLinkStyled to={'/login'}>Log in</NavLinkStyled>
          </li>
          <li>
            <NavLinkStyled to={'/register'}>Registration</NavLinkStyled>
          </li>
        </NavList>
      )}
    </nav>
  );
};

export default Navigation;

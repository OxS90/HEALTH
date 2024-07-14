import { useSelector } from 'react-redux';
import { selectUserName, selectIsLoggedIn } from '../../redux/auth/selectors';
import {
  HeaderStyled,
  UserName,
  Delimiter,
  UserBox,
  Container,
  Title,
  NavLinkStyled,
  Span,
  Wrapper,
  NavWrapper,
} from './Header.styled';
import Navigation from '../../components/Navigation/Navigation';
import logo from '../../assets/logo.png';
import { Desktop, Mobile, Tablet, Default } from '../../components/Media';
import {ButtonLogout} from "../ButtonLogout/ButtonLogout";

export const Header = () => {
  const userName = useSelector(selectUserName);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      <HeaderStyled>
        <Container>
          <NavWrapper>
            <NavLinkStyled to={'/'}>
              <Mobile>
                <img
                  src={logo}
                  alt="img"
                  style={{ width: '46px', height: '44px' }}
                />
              </Mobile>
              <Tablet>
                <img
                  src={logo}
                  alt="img"
                  style={{ width: '46px', height: '44px' }}
                />
              </Tablet>
              <Desktop>
                <img
                  src={logo}
                  alt="img"
                  style={{ width: '70px', height: '66px' }}
                />
              </Desktop>
              <Default>
                <Title>
                  Slim<Span>Mom</Span>
                </Title>
              </Default>
            </NavLinkStyled>
            <Desktop>
              <Delimiter></Delimiter>
            </Desktop>
            <Navigation />
          </NavWrapper>
          <Default>
            {isLoggedIn && (
              <UserBox>
                <UserName>{userName}</UserName>
                <Delimiter></Delimiter>
                <ButtonLogout />
              </UserBox>
            )}
          </Default>
        </Container>
      </HeaderStyled>
      <Mobile>
        {isLoggedIn && (
          <UserBox>
            <Wrapper>
              <UserName>{userName}</UserName>
              <Delimiter></Delimiter>
              <ButtonLogout />
            </Wrapper>
          </UserBox>
        )}
      </Mobile>
    </>
  );
};

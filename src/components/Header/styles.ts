import styled from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';

export const Container = styled.header`
  background-color: #151515;
  display: flex;
  padding: 20px 50px;
`;

export const Logo = styled.div`
  background-color: #8BC298;
  border-radius: 25px;
  height: 50px;
  width: 50px;
`;

export const Nav = styled.nav`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  transition: .2s;
`;

interface NavLinkProps extends LinkProps {
  selected?: boolean;
}

export const NavLink = styled(Link)<NavLinkProps>`
  border-bottom: 2px solid transparent;
  color: white;
  padding-bottom: 8px;
  text-align: center;
  text-decoration: none;
  transition: .2s;
  width: 120px;

  &:hover {
    /* border-bottom: 2px solid #8BC298; */
    color: #8BC298;
  }
`;

export const NavLinkWithoutRedirect = styled.span`
  border-bottom: 2px solid transparent;
  color: white;
  cursor: pointer;
  padding-bottom: 8px;
  text-align: center;
  text-decoration: none;
  transition: .2s;
  width: 120px;

  &:hover {
    /* border-bottom: 2px solid #8BC298; */
    color: #8BC298;
  }
`;

interface LinkUnderlineProps {
  position?: number;
}

export const LinkUnderline = styled.div<LinkUnderlineProps>`
  border-bottom: 2px solid #8BC298;
  height: 32px;
  position: absolute;
  transition: .6s;
  width: 120px;

  transform: translateX(${props => `${props.position}px` ?? 0});
`;

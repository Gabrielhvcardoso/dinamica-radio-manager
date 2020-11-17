import styled from 'styled-components';

export const Button = styled.span`
  background-color: #202020;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 300;
  margin-left: 20px;
  padding: 2px 15px;
  transition: .2s;

  &:hover {
    opacity: 0.6;
  }
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  min-height: 38px;
`;

export const Dot = styled.div`
  background-color: transparent;
  border: 1px solid #8BC298;
  border-radius: 10px;
  height: 10px;
  width: 10px;
`;

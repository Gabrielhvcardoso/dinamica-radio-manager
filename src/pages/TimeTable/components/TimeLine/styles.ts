import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 40px;
`;

export const TimeLine = styled.div`
  border-bottom: 1px solid #303030;
  border-top: 1px solid #303030;
  display: flex;
  height: 100px;
  padding: 20px 0px;
`;

export const Button = styled.button`
  background-color: #303030;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 17px;
  outline: none;
  padding: 10px 25px;

  &:hover {
    opacity: 0.9;
  }
`;

import styled from 'styled-components';

export const Label = styled.div`
  color: #151515;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
`;

export const Button = styled.div`
  background-color: #f2f2f2;
  border: 1px dashed transparent;
  border-radius: 5px;
  box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  cursor: pointer;
  padding: 10px 15px;
  transition: .2s;
  
  
  &:hover {
    background-color: transparent;
    border: 1px dashed #f2f2f2;
  }

  &:hover ${Label} {
    color: white;
  }
`;

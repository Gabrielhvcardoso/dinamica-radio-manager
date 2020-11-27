import styled from 'styled-components';

export const List = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  margin: 40px -10px -10px;
`;

export const AddButton = styled.div`
  align-items: center;
  background-color: #30303045;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  height: 150px;
  justify-content: center;
  margin: 0px 10px;
  transition: .2s;
  width: 150px;

  &:hover {
    transform: scale(1.1);
  }
`;

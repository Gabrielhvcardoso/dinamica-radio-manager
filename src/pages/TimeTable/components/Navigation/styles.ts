import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SelectorsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Selected = styled.span`
  background-color: #202020;
  border-radius: 16px;
  color: white;
  cursor: default;
  font-weight: 100;
  padding: 5px 15px;
`;

export const Selector = styled.span`
  background-color: #202020;
  border-radius: 16px;
  color: white;
  cursor: pointer;
  height: 32px;
  line-height: 32px;
  margin: 0px 5px;
  text-align: center;
  transition: .2s;
  width: 32px;

  &:hover {
    background-color: #303030;
  }
`;
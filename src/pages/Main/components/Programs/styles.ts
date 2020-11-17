import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: 25px;
`;

export const ScrollView = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px -50px;
  overflow-x: scroll;
  padding: 0px 50px 20px 50px;
`;

export const ProgramBox = styled.div`
  background-color: #202020;
  border-radius: 10px;
  height: 150px;
  margin: 0px 10px;
  min-width: 150px;
`;
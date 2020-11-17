import styled from 'styled-components';

const HOUR = 4.16;

export const Container = styled.div`
  align-items: flex-start;
  background-color: #E07A5F;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: space-between;
  margin-right: 0.1%;
  overflow: hidden;
  padding: 10px;
  transition: .2s;
  width: ${HOUR * 6}%;
`;

export const TimeDetail = styled.span`
  background-color: #fff;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  padding: 0px 8px;
`;

export const ProgramTitle = styled.span`
  color: black;
  font-weight: 900;
`;

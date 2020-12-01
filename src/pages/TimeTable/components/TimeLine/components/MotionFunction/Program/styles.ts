import styled from 'styled-components';

export const Draggable = styled.div`
  background-color: white;
  border-radius: 4px 0px 0px 4px;
  cursor: e-resize;
  height: 50px;
  position: absolute;
  right: 0px;
  top: 25px;
  width: 4px;
  z-index: 2;
`;

export const NoWrapText = styled.span`
  white-space: nowrap;
`;

export const ScheduleItem = styled.div.attrs({
  draggable: false
})`
  background-color: #E07A5F;
  border-left: 1px solid black;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: grab;
  display: flex;
  flex-direction: column;
  height: 100px;
  justify-content: space-between;
  padding: 10px;
  position: absolute;
`;

import styled from 'styled-components';
import DefaultTitle from '../../../../../../components/Title';

export const Title = styled(DefaultTitle)`
  cursor: pointer;
  font-size: 28px;
  margin: 0px;
  margin-left: 20px;

  &:hover {
    opacity: 0.7;
  }
`;

export const TitleContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export const BottomContainer = styled.div`
  display: flex;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DetailsContainer = styled.div`
  cursor: default;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

export const HorizontalLine = styled.div`
  align-self: stretch;
  border-radius: 1px;
  height: 80px;
  background-color: #202020;
  width: 2px;
  margin: 0px 5px;
`;

export const Details = styled.span`
  color: #A2A2A2;
  font-weight: 300;
`;

interface DotProps {
  selected?: boolean;
}

export const Dot = styled.div<DotProps>`
  background-color: ${props => props.selected ? '#8BC298' : 'transparent'};
  border: 1px solid #8BC298;
  border-radius: 10px;
  height: 10px;
  width: 10px;
`;

import styled from 'styled-components';

interface ContainerProps {
  color?: string;
}

export const Container = styled.div<ContainerProps>`
  align-self: stretch;
  background-color: ${props => props.color ?? "#333"};
  flex: 1;
  margin: 0px 10px;
`;

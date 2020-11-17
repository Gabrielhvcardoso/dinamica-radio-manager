import React from 'react';
import styled from 'styled-components';
import colors from '../../../../utils/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px -5px;
`;

interface CategoryItemProps {
  children?: string;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ children }) => {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const textColor = color.isLight() ? "black" : "white";

  return (
    <CategoryItemComponent color={color.hex()} textColor={textColor}>
      { children }
    </CategoryItemComponent>
  );
}

interface CategoryItemComponentProps {
  color: string;
  textColor: string;
}

const CategoryItemComponent = styled.span<CategoryItemComponentProps>`
  background-color: ${props => props.color};
  border-radius: 16px;
  color: ${props => props.textColor};
  cursor: pointer;
  font-size: 14px;
  margin: 0px 5px;
  padding: 2px 10px;
  transition: .2s;

  &:hover {
    opacity: 0.7;
  }
`;

export const Add = styled.span`
  background-color: #303030;
  border-radius: 16px;
  color: white;
  cursor: pointer;
  height: 24px;
  line-height: 24px;
  width: 24px;
  margin: 0px 0px 0px 5px;
  text-align: center;
  transition: .2s;

  &:hover {
    transform: scale(1.1)
  }
`;
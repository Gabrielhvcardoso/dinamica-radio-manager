import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';

interface CategoryItemProps {
  children?: string;
  isSelected: boolean;
  onClick: (e: SyntheticEvent) => void
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ children, isSelected, onClick }) => {
  return (
    <CategoryItemComponent
      color={'#303030'}
      onClick={onClick}
      textColor={isSelected ? '#ffffff' : 'grey'}
    >
      <span style={{ whiteSpace: 'nowrap' }}>
        { children }
      </span>
    </CategoryItemComponent>
  );
};

interface CategoryItemComponentProps {
  color: string;
  textColor: string;
}

const CategoryItemComponent = styled.div<CategoryItemComponentProps>`
  background-color: ${props => props.color};
  border-radius: 16px;
  color: ${props => props.textColor};
  height: 20px;
  cursor: pointer;
  flex: 0 1 auto;
  font-size: 14px;
  margin: 0px 5px;
  padding: 2px 10px;
  transition: .2s;

  -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
  &:hover {
    opacity: 0.7;
  }
`;

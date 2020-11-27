import update from 'immutability-helper';
import React, { useContext, useEffect, useState } from 'react';
import { Category } from '../../../../../types/Category';
import { CategoryItem as CategoryItemContainer } from './styles';

import ProgramsPageContext from '../../../context';

const CategoryItem: React.FC<{ item: Category }> = (props) => {
  const { selectedCategories, setSelectedCategories } = useContext(ProgramsPageContext);
  const [isSelected, setIsSelected] = useState<boolean>(selectedCategories.some((categoryId) => categoryId === props.item.categoryId));

  const handleClick = () => {
    if (isSelected) {
      const newSelectedCategories = selectedCategories.filter((categoryId) => categoryId !== props.item.categoryId);
      setSelectedCategories(newSelectedCategories);
    } else {
      setSelectedCategories(update(selectedCategories, {
        $push: [props.item.categoryId]
      }));
    }
  };

  useEffect(() => {
    if (selectedCategories.some(categoryId => categoryId === props.item.categoryId)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [props.item.categoryId, selectedCategories]);

  return (
    <CategoryItemContainer isSelected={isSelected} onClick={handleClick}>
      { props.item.name }
    </CategoryItemContainer>
  );
};

export default CategoryItem;

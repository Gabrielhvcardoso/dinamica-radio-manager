import update from 'immutability-helper';
import React, { useContext, useState } from 'react';
import { Add, CategoryItem as CategoryItemContainer, Container } from './styles';

import { Category } from '../../../../types/Category';

import ProgramsPageContext from '../../context';

const CategoryItem: React.FC<{ item: Category }> = (props) => {
  const { selectedCategories, setSelectedCategories } = useContext(ProgramsPageContext);
  const [isSelected, setIsSelected] = useState<boolean>(selectedCategories.some((categoryId) => categoryId === props.item.categoryId));

  const handleClick = () => {
    if (isSelected) {
      let newSelectedCategories = selectedCategories.filter((categoryId) => categoryId !== props.item.categoryId);
      setSelectedCategories(newSelectedCategories);
    } else {
      setSelectedCategories(update(selectedCategories, {
        $push: [props.item.categoryId],
      }));
    }

    setIsSelected(!isSelected);
  }
  
  return (
    <CategoryItemContainer isSelected={isSelected} onClick={handleClick}>
      {
        props.item.name
      }
    </CategoryItemContainer>
  )
}

const Categories: React.FC = () => {
  const { setOpenCategory, categories } = useContext(ProgramsPageContext);
  

  return (
    <Container>
      {
        categories.map((item) => (
          <CategoryItem key={item.categoryId} item={item} />
        ))
      }

      <Add onClick={() => setOpenCategory(true)}>+</Add>
    </Container>
  );
}

export default Categories;
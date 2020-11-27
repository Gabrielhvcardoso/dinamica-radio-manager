import React, { useContext } from 'react';
import { Add, Container } from './styles';

import CategoryItem from './CategoryItem';

import ProgramsPageContext from '../../context';
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
};

export default Categories;

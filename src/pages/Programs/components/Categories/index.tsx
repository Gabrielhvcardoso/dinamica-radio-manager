import React, { useContext } from 'react';
import { Add, CategoryItem, Container } from './styles';

import ProgramsPageContext from '../../context';

const Categories: React.FC = () => {
  const { setOpenCategory } = useContext(ProgramsPageContext);
  
  return (
    <Container>
      <CategoryItem>Categoria 1</CategoryItem>
      <CategoryItem>Categoria 2</CategoryItem>
      <CategoryItem>Categoria 3</CategoryItem>

      <Add onClick={() => setOpenCategory(true)}>+</Add>
    </Container>
  );
}

export default Categories;
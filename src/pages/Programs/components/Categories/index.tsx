import React from 'react';
import { Add, CategoryItem, Container } from './styles';

const Categories: React.FC = () => {
  return (
    <Container>
      <CategoryItem>Categoria 1</CategoryItem>
      <CategoryItem>Categoria 2</CategoryItem>
      <CategoryItem>Categoria 3</CategoryItem>

      <Add>+</Add>
    </Container>
  );
}

export default Categories;
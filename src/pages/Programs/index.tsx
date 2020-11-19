import React from 'react';
import { Container } from './styles';
import { AnimateSharedLayout } from 'framer-motion';

import Categories from './components/Categories';
import CategoryContainer from './components/CategoryContainer';

import ProgramList from './components/ProgramList';
import ProgramContainer from './components/ProgramContainer';
import Title from '../../components/Title';

import { ProgramsPageContextProvider } from './context';

const Programs: React.FC = () => {
  return (
    <ProgramsPageContextProvider>
      <Container>
        <Title>Programas</Title>
        
        <AnimateSharedLayout type="crossfade">
          <Categories />
          <CategoryContainer />
        </AnimateSharedLayout>

        <AnimateSharedLayout type="switch">
          <ProgramList />
          <ProgramContainer />
        </AnimateSharedLayout>
      
      </Container>
    </ProgramsPageContextProvider>
  );
}

export default Programs;

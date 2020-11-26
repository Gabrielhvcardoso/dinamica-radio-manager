import React from 'react';
import { Container } from './styles';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

import Categories from './components/Categories';
import CategoryContainer from './components/CategoryContainer';

import ProgramList from './components/ProgramList';
import ProgramContainer from './components/ProgramContainer';
import Title from '../../components/Title';

import { ProgramsPageContextProvider } from './context';

const Programs: React.FC = () => {
  return (
    <ProgramsPageContextProvider>
      <CategoryContainer />
      <ProgramContainer />

      <AnimateSharedLayout type="switch">
        <AnimatePresence>
        <Container className="screen-resize">
          <Title>Programas</Title>

          <Categories />
          <ProgramList />

        </Container>
        </AnimatePresence>
      </AnimateSharedLayout>
    </ProgramsPageContextProvider>
  );
};

export default Programs;

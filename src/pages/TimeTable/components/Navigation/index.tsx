import React, { useContext } from 'react';
import { AddButton, Container, Selected, Selector, SelectorsContainer } from './styles';

import Title from '../../../../components/Title';
import TimeTableContext from '../../context';

const Navigation: React.FC = () => {
  const { filter, setFilter, setIsSelectorActive } = useContext(TimeTableContext);
  
  const filterList = [
    { id: 0, name: "Domingo", abrev: "D" },
    { id: 1, name: "Segunda-feira", abrev: "S" },
    { id: 2, name: "Terça-feira", abrev: "T" },
    { id: 3, name: "Quarta-feira", abrev: "Q" },
    { id: 4, name: "Quinta-feira", abrev: "Q" },
    { id: 5, name: "Sexta-feira", abrev: "S" },
    { id: 6, name: "Sábado", abrev: "S" },
  ]

  return (
    <Container>
      <Title>Programação</Title>

      <SelectorsContainer>
        <Selected>
          {
            filterList.find((item) => item.id === filter)?.name
          }
        </Selected>

        {
          filterList.map(({ id, abrev }) => (
            <Selector
              onClick={() => setFilter(id)}
              key={id}
              selected={filter === id}
            >{ abrev }
            </Selector>
          ))
        }
      <AddButton onClick={() => setIsSelectorActive(true)}>Adicionar +</AddButton>
      </SelectorsContainer>
    </Container>
  );
}

export default Navigation;
import React, { useContext } from 'react';
import { BottomContainer, Container, Details, DetailsContainer, Dot, HorizontalLine, Title, TitleContainer } from './styles';

import DataContext, { ScheduleProgram } from '../../../../../../context/data';

interface ListItemProps {
  first?: boolean;
  item: ScheduleProgram
}

const resolveDecimalTime = (time: number): string => {
  const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60).toString();
  return `${(hours === 24 ? 0 : hours).toString().padStart(2, '0')}:${minutes.padStart(2, '0')}`;
};

const ListItem: React.FC<ListItemProps> = ({ first, item }) => {
  const { categories } = useContext(DataContext);

  return (
    <Container>
      <TitleContainer>
        <Dot selected={first} />
        <Title>{ item.title }</Title>
      </TitleContainer>
      <BottomContainer>
        <HorizontalLine />

        <DetailsContainer>
          <Details>{ resolveDecimalTime(item.startAt) } - { resolveDecimalTime(item.startAt + item.duration) }</Details>
          <Details>
            {
              item.tags?.map(tag => categories?.find(({ categoryId }) => categoryId === tag)?.name).join(', ')
            }
          </Details>
        </DetailsContainer>
      </BottomContainer>
    </Container>
  );
};

export default ListItem;

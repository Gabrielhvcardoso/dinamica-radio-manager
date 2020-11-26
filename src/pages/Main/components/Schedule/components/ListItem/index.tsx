import React from 'react';
import { BottomContainer, Container, Details, DetailsContainer, Dot, HorizontalLine, Title, TitleContainer } from './styles';

interface ListItemProps {
  first?: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ first }) => {
  return (
    <Container>
      <TitleContainer>
        <Dot selected={first} />
        <Title>Techno House</Title>
      </TitleContainer>
      <BottomContainer>
        <HorizontalLine />

        <DetailsContainer>
          <Details>20h00 - 22h00</Details>
          <Details>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae...</Details>
        </DetailsContainer>
      </BottomContainer>
    </Container>
  );
};

export default ListItem;

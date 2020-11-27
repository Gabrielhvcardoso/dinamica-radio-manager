import React, { SyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { AnimatePresence, motion } from 'framer-motion';
import { Portal } from 'react-portal';

interface CategoryItemProps {
  children?: string;
  isSelected: boolean;
  onClick: (e: SyntheticEvent) => void,
  onDelete: (onEnd: () => void) => void
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ children, isSelected, onClick, onDelete }) => {
  const [isDeleteActive, setIsDeleteActive] = useState<boolean>(false);

  const handleDeleteClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsDeleteActive(true);
  };

  const handleDelete = () => {
    onDelete(() => {
      setIsDeleteActive(false);
    });
  };

  return (
    <>
      <AnimatePresence>
        {
          isDeleteActive && (
            <Portal>
              <Backdrop onMouseDown={() => setIsDeleteActive(false)}>
                <Menu onMouseDown={e => e.stopPropagation()}>
                  <p>Deletar categoria { children }?</p>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={() => setIsDeleteActive(false)}>Cancelar</Button>
                    <Button onClick={handleDelete}>Sim, excluir</Button>
                  </div>
                </Menu>
              </Backdrop>
            </Portal>
          )
        }
      </AnimatePresence>
      <CategoryItemComponent
        color={'#303030'}
        onClick={onClick}
        textColor={isSelected ? '#ffffff' : 'grey'}
      >
        <span style={{ whiteSpace: 'nowrap' }}>
          { children }
        </span>

        <DeleteCategory onClick={handleDeleteClick}>
          <Icon path={mdiClose} size={0.7} color="red" />
        </DeleteCategory>
      </CategoryItemComponent>
    </>
  );
};

const DeleteCategory = styled(motion.div)`
  display: flex;
  align-items: center;
  margin: 0px 0px 0px -17px;
  opacity: 0;
  transform: rotate(90deg);
  transition: .2s;
  visibility: hidden;
`;

interface CategoryItemComponentProps {
  color: string;
  textColor: string;
}

const CategoryItemComponent = styled.div<CategoryItemComponentProps>`
  background-color: ${props => props.color};
  border-radius: 16px;
  color: ${props => props.textColor};
  cursor: pointer;
  display: flex;
  height: 20px;
  flex: 0 1 auto;
  font-size: 14px;
  margin: 0px 5px;
  padding: 2px 10px;
  transition: .2s;

  -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
  &:hover {
    opacity: 0.7;
  }

  &:hover ${DeleteCategory} {
    margin: 0px 0px 0px 5px;
    opacity: 1;
    transform: rotate(0deg);
    visibility: visible;
  }
`;

const Backdrop = styled(motion.div).attrs({
  initial: { backgroundColor: 'rgba(0, 0, 0, 0)' },
  animate: { backgroundColor: 'rgba(0, 0, 0, 0.6)' },
  exit: { backgroundColor: 'rgba(0, 0, 0, 0)' }
})`
  align-items: center;
  bottom: 0;
  display: flex;
  left: 0;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 20;
`;

const Menu = styled(motion.div).attrs({
  initial: { translateY: -100, opacity: 0 },
  animate: { translateY: 0, opacity: 1 },
  exit: { translateY: 100, opacity: 0 },
  transition: {
    type: 'spring',
    stiffness: 500,
    damping: 42
  }
})`
  background-color: #202020;
  border-radius: 4px;
  color: white;
  display: flex;
  flex-direction: column;
  max-height: 600px;
  overflow-y: auto;
  padding: 10px 20px;
  width: 400px;
  max-width: 95%;
`;

const Button = styled.button`
  background-color: #303030;
  border: none;
  border-radius: 4px;
  color: #6F6F6F;
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  font-size: 12px;
  font-weight: 800;
  margin-left: 10px;
  outline: none;
  padding: 8px 20px 8px;
  text-transform: uppercase;
  transition: .2s;

  &:hover {
    color: white;
  }
`;

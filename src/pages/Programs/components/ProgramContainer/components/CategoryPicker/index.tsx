import update from 'immutability-helper';
import React, { useContext } from 'react';
import { Portal } from 'react-portal';
import { Backdrop, Menu, MenuItem } from './styles';

import ProgramsPageContext from '../../../../context';

interface CategoryPickerProps {
  onDismiss: () => void;
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({ onDismiss }) => {
  const { categories, selected, setSelected, programs, setPrograms } = useContext(ProgramsPageContext);

  const handleSelect = (id: number ) => {
    if (!selected) return;
    
    const index = programs.findIndex(({ programId }) => programId === selected?.programId);
    
    const program = update(selected, {
      tags: { $push: [id] }
    });


    setSelected(program);
    setPrograms(update(programs, {
      [index]: { $set: program },
    }));

    onDismiss();
  }

  return (
    <Portal>
      <Backdrop onMouseDown={onDismiss}>
        <Menu onMouseDown={e => e.stopPropagation()}>
          {
            categories.map(({ categoryId, name }) => (
              <MenuItem onClick={() => handleSelect(categoryId)}>{ name }</MenuItem>
            ))
          }
        </Menu>
      </Backdrop>
    </Portal>
  );
}

export default CategoryPicker;
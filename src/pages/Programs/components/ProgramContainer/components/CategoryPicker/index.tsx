import update from 'immutability-helper';
import React, { useContext, useState } from 'react';
import { Portal } from 'react-portal';
import { Backdrop, Menu, MenuItem } from './styles';

import Alert from '../../../../../../components/Alert';

import ProgramsPageContext from '../../../../context';
import { useFetch } from '../../../../../../hooks';

interface CategoryPickerProps {
  onDismiss: () => void;
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({ onDismiss }) => {
  const { categories, selected, setSelected, programs, setPrograms } = useContext(ProgramsPageContext);
  const [isError, setIsError] = useState<boolean>(false);

  const showError = () => {
    setIsError(true);
    setTimeout(() => setIsError(false), 5000);
  }

  const handleSelect = (categoryId: number) => {
    useFetch.put('/tag', {
      programId: selected?.programId,
      categoryId
    }, (response) => {
      if (response.code === "success") {
        handleInsert(categoryId);
      } else {
        showError();
      }
    })
  }
  
  const handleInsert = (id: number ) => {
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
            isError && (
              <Alert error>Algum erro ocorreu ao tentar atribuir uma nova categoria.</Alert>
            )
          }

          {
            categories.map(({ categoryId, name }) => (
              <MenuItem key={categoryId} onClick={() => handleSelect(categoryId)}>{ name }</MenuItem>
            ))
          }
        </Menu>
      </Backdrop>
    </Portal>
  );
}

export default CategoryPicker;
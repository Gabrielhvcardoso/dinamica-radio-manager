import React, { useContext } from 'react';
import { AddButton, List } from './styles';
import Program from './Program';
import { Icon } from '@mdi/react';
import { mdiPlus } from '@mdi/js';

import ProgramsPageContext from '../../context';

const ProgramList: React.FC = () => {
  const { filteredPrograms: programs, setOpenProduct } = useContext(ProgramsPageContext);

  return (
    <List>
      {
        programs.map((program) => (
          <Program key={program.programId} program={program} />
        ))
      }

      <AddButton onClick={() => setOpenProduct(true)}>
        <Icon path={mdiPlus} size={2} color="#404040" />
      </AddButton>
    </List>
  );
};

export default ProgramList;

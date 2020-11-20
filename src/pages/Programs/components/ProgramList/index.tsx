import React, { useContext } from 'react';
import { List } from './styles';
import Program from './Program';

import ProgramsPageContext from '../../context';

const ProgramList: React.FC = () => {
  const { filteredPrograms: programs } = useContext(ProgramsPageContext);

  return (
    <List>
      {
        programs.map((program) => (
          <Program key={program.programId} program={program} />
        ))
      }
    </List>
  );
}

export default ProgramList;

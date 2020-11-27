import React, { useContext } from 'react';
import { List } from './styles';
import Program from './Program';

import ProgramsPageContext from '../../context';

const ProgramList: React.FC = () => {
  const { filteredPrograms: programs } = useContext(ProgramsPageContext);

  return (
    <List>
      {
        !programs[0]
          ? <p style={{ marginLeft: 10, color: '#bbb', cursor: 'default' }}>Não há resultados</p>
          : <></>
      }
      {
        programs.map((program) => (
          <Program key={program.programId} program={program} />
        ))
      }
    </List>
  );
};

export default ProgramList;

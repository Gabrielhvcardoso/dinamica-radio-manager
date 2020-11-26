import React from 'react';

import { Marker } from './styles';

const Meassuring: React.FC = () => {
  return (
    <div>
      {
        [
          '00H', '01H', '02H', '03H', '04H', '05H', '06H', '07H', '08H', '09H', '10H', '11H', '12H', '13H', '14H', '15H', '16H', '17H', '18H', '19H', '20H', '21H', '22H', '23H'
        ].map((item) => (
          <Marker key={item}>{ item }</Marker>
        ))
      }
    </div>
  );
};

export default Meassuring;

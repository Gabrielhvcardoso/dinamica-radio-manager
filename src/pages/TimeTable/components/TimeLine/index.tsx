import update from 'immutability-helper';
import React, { createRef,  useState } from 'react';

import { Motion, spring } from 'react-motion';
import { Container, Marker, TimeLine as TimeLineComponent } from './styles';
import Program from './components/TempProgram';
import { useDimensions } from '../../../../hooks';

export interface ArrayItem {
  id: number,
  title: string,
  order: number,
  duration: number,
  accumulated: number
}

interface MotionFunctionProps {
  item: ArrayItem,
  previousItems: number,

  moveProgram: (dragDirtyId: string, hoverDirtyId: string) => void,
  meassureUnit: number,
}

const MotionFunction: React.FC<MotionFunctionProps> = ({ item, previousItems, moveProgram, meassureUnit }) => {
  const { accumulated, id, order, title, duration } = item;

  return (
    <Motion
      key={id}
      style={{
        x: spring(
          accumulated * meassureUnit,
          { stiffness: 500, damping: 32 }
        )
      }}
    >
      {
        ({ x }) => (
          <Program
            moveProgram={moveProgram}
            id={`program-${id}`}
            order={order}
            title={title}
            style={{
              width: duration * meassureUnit + 'px',
              transform: `translate3d(${x}px, 0px, 0)`,
            }}
          />
        )
      }
    </Motion>
  );
}


const TimeLine: React.FC = () => {
  const timelineRef = createRef<HTMLDivElement>();
  const UNIT = useDimensions(timelineRef).width / 24;

  const [programs, setPrograms] = useState<Array<ArrayItem>>([
    { id: 1, title: "1", order: 0, duration: 2, accumulated: 0 },
    { id: 2, title: "2", order: 1, duration: 3, accumulated: 2 },
    { id: 3, title: "3", order: 2, duration: 2, accumulated: 5 },
    { id: 4, title: "4", order: 3, duration: 2, accumulated: 7 },
    { id: 5, title: "5", order: 4, duration: 2, accumulated: 9 },
    { id: 6, title: "6", order: 5, duration: 2, accumulated: 11 },
    { id: 7, title: "7", order: 6, duration: 2, accumulated: 13 },
    { id: 8, title: "8", order: 7, duration: 2, accumulated: 15 },
  ]);

  const moveProgram = (dragDirtyId: string, hoverDirtyId: string) => {
    const dragId = parseInt(dragDirtyId.split("-")[1]);
    const hoverId = parseInt(hoverDirtyId.split("-")[1]);
    const dragIndex = programs.findIndex((el) => el.id === dragId);
    const hoverIndex = programs.findIndex((el) => el.id === hoverId);
  
    const drag = programs[dragIndex];
    const hover = programs[hoverIndex];
    
    // Create a new instance of programs state
    let newPrograms = programs;

    // Set new order
    newPrograms = update(newPrograms, {
      [hoverIndex]: { order: { $set: drag.order } },
      [dragIndex]: { order: { $set: hover.order } } 
    });

    // Sort by order number and set all accumulated values
    let accumulated = 0;
    newPrograms = newPrograms.sort((a,b) => a.order > b.order ? 1 : -1).reduce((acc, item) => {
      acc.push({
        ...item,
        accumulated
      });

      accumulated += item.duration;
      return acc;
    }, [] as Array<ArrayItem>);

    newPrograms = newPrograms.sort((a,b) => a.id > b.id ? 1 : -1)

    setPrograms(newPrograms);
  }

  return (
    <Container>
      <TimeLineComponent ref={timelineRef}>
        {
          programs.map((item) => (
            <MotionFunction
              item={item}
              previousItems={programs.slice(0, programs.findIndex((el) => el.order === item.order)).reduce((acc, { duration }) => {
                acc += UNIT * duration;
                return acc;
              }, 0)}
              meassureUnit={UNIT}
              moveProgram={moveProgram}
            /> 
          ))
        }
      </TimeLineComponent>

      {
        [
          "00H", "01H", "02H", "03H", "04H", "05H", "06H", "07H", "08H", "09H", "10H", "11H", "12H", "13H", "14H", "15H", "16H", "17H", "18H", "19H", "20H", "21H", "22H", "23H",
        ].map((item) => (
          <Marker key={item}>{ item }</Marker>
        ))
      }
    </Container>
  );
}

export default TimeLine;
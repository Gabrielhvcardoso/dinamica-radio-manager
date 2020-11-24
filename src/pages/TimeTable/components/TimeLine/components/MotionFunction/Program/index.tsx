import React, { SyntheticEvent } from 'react';
import { DragSource, DropTarget, ConnectDragSource, ConnectDropTarget } from 'react-dnd';
import { Draggable } from './styles';
import TimeTableContext from '../../../../../context';

const ItemTypes = {
  CARD: 'card',
};

interface Props {
  id: string,
  title: string,
  order: number,
  moveProgram: (dragId: string, hoverId: string) => void
}

const programSource = {
  beginDrag(props: { id: string, order: number }) {
    return {
      id: props.id,
      order: props.order
    };
  },
};

const programTarget = {
  hover (props: Props, monitor: any, component: any) {
    const dragId = monitor.getItem().id;
    const hoverId = props.id;
    const dragOrder = monitor.getItem().order;
    const hoverOrder = props.order;

    if (dragId === hoverId) {
      return;
    }
  
    const decoratedComponentInstance= document.getElementById(component.props.id);

    if (decoratedComponentInstance) {
      const hoverBoundingRect = decoratedComponentInstance.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      if (dragOrder < hoverOrder && hoverClientX < hoverMiddleX) {
        return;
      }

      if (dragOrder > hoverOrder && hoverClientX > hoverMiddleX) {
        return;
      }
    
      props.moveProgram(dragId, hoverId);
    }
  }
}

const dropTargetHOC = DropTarget(ItemTypes.CARD, programTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}));

const dragSourceHOC = DragSource(ItemTypes.CARD, programSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}));

interface TempProgramProps {
  connectDragSource: ConnectDragSource,
  connectDropTarget: ConnectDropTarget,
  duration: string;
  startAt: string,
  endAt: string,
  id: string,
  isDragging: boolean,
  measureUnit: number,
  moveProgram: (dragId: string, hoverId: string) => void,
  order: number,
  style?: {},
  title: string,
}

// Resizable

const handleResize = (
  e: SyntheticEvent<HTMLDivElement>,
  measureUnit: number,
  setProgramDuration: (programId: number, duration: number) => void,
) => {
  e.stopPropagation();
  e.preventDefault();

  const { id } = (e.target as HTMLDivElement).parentNode as HTMLDivElement;
  
  const callFunction = (e: MouseEvent) => {
    resize(e, id, measureUnit, setProgramDuration);
  }

  window.addEventListener('mousemove', callFunction)
  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', callFunction);
  });
}

const resize = (e: MouseEvent, elementId: string, measureUnit: number, setProgramDuration: (programId: number, duration: number) => void) => {
  const element = document.getElementById(elementId);

  if (element) {
    const elementWidth = e.pageX - element.getBoundingClientRect().left;
    const durationInHours = Math.round((elementWidth * 60) / measureUnit / 5) * 5 / 60
    const programId = parseInt(elementId.split("-")[1]);
    setProgramDuration(programId, durationInHours);
  }
}



class TempProgram extends React.Component<TempProgramProps> {
  render () {
    const { style, startAt, endAt, id, title, duration, measureUnit, isDragging, connectDragSource, connectDropTarget } = this.props;

    const opacity = isDragging ? 0 : 1;
    const zIndex = isDragging ? 2 : 1;

    return connectDragSource(connectDropTarget(
        <div
          draggable={false}
          id={id}
          style={{
            ...style,
            opacity,
            zIndex,
            backgroundColor: '#E07A5F',
            borderLeft: '1px solid black',
            borderRadius: 10,
            boxSizing: 'border-box',
            cursor: 'grab',
            display: 'flex',
            flexDirection: 'column',
            height: 100,
            justifyContent: 'space-between',
            padding: 10,
            position: 'absolute',
          }}
        >
          <span style={{
            alignSelf: 'flex-start',
            backgroundColor: 'white',
            borderRadius: 16,
            fontSize: 12,
            padding: '1px 8px'
          }}>{ duration } hrs</span>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span>{ title }</span>
            <span style={{ fontSize: 11 }}>{ `${startAt} - ${endAt}` }</span>
          </div>
          
          <Draggable className="right-resizer" onMouseDown={(e) => handleResize(e, measureUnit, this.context.setProgramDuration)} />
        </div>
      )
    )
  }
}

TempProgram.contextType = TimeTableContext;

export default dropTargetHOC(dragSourceHOC(TempProgram));

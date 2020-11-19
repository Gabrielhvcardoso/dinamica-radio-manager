import React from 'react';
import { DragSource, DropTarget, ConnectDragSource, ConnectDropTarget } from 'react-dnd';

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
  isDragging: boolean,
  id: string,
  order: number,
  horary: string,
  moveProgram: (dragId: string, hoverId: string) => void,
  title: string,
  style?: {},
}

class TempProgram extends React.Component<TempProgramProps> {
  render () {
    const { style, horary, id, title, isDragging, connectDragSource, connectDropTarget } = this.props;

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
          }}>{ horary }</span>
          <span>{ title }</span>
        </div>
      )
    )
  }
}

export default dropTargetHOC(dragSourceHOC(TempProgram));

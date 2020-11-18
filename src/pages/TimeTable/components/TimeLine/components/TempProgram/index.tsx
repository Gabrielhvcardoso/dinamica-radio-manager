import React from 'react';
import { DragSource, DropTarget, ConnectDragSource, ConnectDropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import ItemTypes from '../ItemTypes';


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
  moveProgram: (dragId: string, hoverId: string) => void,
  title: string,
  style?: {},
}

class TempProgram extends React.Component<TempProgramProps> {
  render () {
    const { style, id, title, isDragging, connectDragSource, connectDropTarget } = this.props;

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
            borderRadius: 10,
            boxSizing: 'border-box',
            height: 100,
            borderLeft: '1px solid black',
            padding: 10,
            position: 'absolute',
          }}
        >
          { title }
        </div>
      )
    )
  }
}

export default dropTargetHOC(dragSourceHOC(TempProgram));

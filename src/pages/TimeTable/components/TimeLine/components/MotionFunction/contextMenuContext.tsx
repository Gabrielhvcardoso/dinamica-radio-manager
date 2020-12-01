import { AnimatePresence } from 'framer-motion';
import React, { createContext, useContext, useState } from 'react';
import { Portal } from 'react-portal';
import { Icon } from '@mdi/react';
import { mdiDeleteOutline } from '@mdi/js';
import { Backdrop, DropDown, MenuItem } from './styles';
import Alert from '../../../../../../components/Alert';
import TimeTableContext from '../../../../context';

interface Position {
  x: number,
  y: number
}

interface ContextMenuContextProperties {
  position: Position | null,

  setPosition: (arg: Position | null) => void,
  handleContextMenu: (e: React.MouseEvent<HTMLDivElement>, hash: string) => void
}

const ContextMenuContext = createContext<ContextMenuContextProperties>({} as ContextMenuContextProperties);

export const ContextMenuContextProvider: React.FC = ({ children }) => {
  const { removeProgram } = useContext(TimeTableContext);

  const [error, setError] = useState<string | null>(null); ;

  const [selected, setSelected] = useState<string | null>(null);
  const [position, setPosition] = useState<Position | null>(null);

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>, hash: string) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setSelected(hash);
  };

  const onDismiss = () => {
    setPosition(null);
    setSelected(null);
  };

  const handleDelete = () => selected && removeProgram(selected, (message) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  }, () => {
    onDismiss();
  });

  const value = { position, setPosition, handleContextMenu };

  return (
    <ContextMenuContext.Provider value={value}>
      <AnimatePresence>
        {
          position !== null && (
            <Portal>
              <Backdrop onMouseDown={onDismiss}>
                {
                  error && (
                    <Alert>
                      { error }
                    </Alert>
                  )
                }
                <DropDown onMouseDown={e => e.stopPropagation()} style={{ top: position.y, left: position.x, right: 'auto', bottom: 'auto' }}>
                  <MenuItem onClick={handleDelete}>
                    <Icon path={mdiDeleteOutline} size={1} color="#444" />
                    <span style={{ marginLeft: 10 }}>Remover</span>
                  </MenuItem>
                </DropDown>
              </Backdrop>
            </Portal>
          )
        }
      </AnimatePresence>

      { children }
    </ContextMenuContext.Provider>
  );
};

export default ContextMenuContext;

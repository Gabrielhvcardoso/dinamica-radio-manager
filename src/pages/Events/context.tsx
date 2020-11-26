import React, { createContext, useContext, useState } from 'react';
import { Banner } from '../../types/Banner';

import DataContext from '../../context/data';

interface EventsContextProps {
  selected: Banner | null,
  setSelected: (arg: Banner | null) => void,

  events: Array<Banner>,
  setEvents: (arg: Array<Banner>) => void
}

const EventsContext = createContext({} as EventsContextProps);

export const EventsContextProvider: React.FC = ({ children }) => {
  const { banners: events, setBanners: setEvents } = useContext(DataContext);

  const [selected, setSelected] = useState<Banner | null>(null);

  return (
    <EventsContext.Provider value={{ selected, setSelected, events, setEvents }}>
      { children }
    </EventsContext.Provider>
  );
};

export default EventsContext;

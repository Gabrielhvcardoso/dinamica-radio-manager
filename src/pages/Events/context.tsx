import React, { createContext, useState } from 'react';
import { Banner } from '../../types/Banner';

interface EventsContextProps {
  selected: Banner | null,
  setSelected: (arg: Banner | null) => void,

  events: Array<Banner>,
  setEvents: (arg: Array<Banner>) => void
}

const EventsContext = createContext({} as EventsContextProps);

export const EventsContextProvider: React.FC = ({ children }) => {
  const [selected, setSelected] = useState<Banner | null>(null);
  const [events, setEvents] = useState<Array<Banner>>([
    { bannerId: 1, createdAt: new Date().getTime(), title: "Evento 1" },
    { bannerId: 2, createdAt: new Date().getTime(), title: "Evento 2" },
    { bannerId: 3, createdAt: new Date().getTime(), title: "Evento 3" },
    { bannerId: 4, createdAt: new Date().getTime(), title: "Evento 4" },
    { bannerId: 5, createdAt: new Date().getTime(), title: "Evento 5" },
  ]);

  return (
    <EventsContext.Provider value={{ selected, setSelected, events, setEvents }}>
      { children }
    </EventsContext.Provider>
  );
}

export default EventsContext;

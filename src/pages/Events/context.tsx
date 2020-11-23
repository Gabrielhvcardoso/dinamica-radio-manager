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
    { bannerId: 1, createdAt: new Date().getTime(), title: "John Blake Mix Tour", image: "https://cdn.dribbble.com/users/1065176/screenshots/14149875/media/03781b98f3252cf54fd1a8553e7e03e2.jpg" },
    { bannerId: 2, createdAt: new Date().getTime(), title: "New Age - Superbeat night", image: "https://cdn.dribbble.com/users/1065176/screenshots/13922161/media/0856303467607c461c1d5a1e073982e2.jpg" },
    { bannerId: 3, createdAt: new Date().getTime(), title: "Beat Eve", image: "https://cdn.dribbble.com/users/1065176/screenshots/9330551/media/baf6527715cf344968ce193c3a98a1eb.jpg" },
    { bannerId: 4, createdAt: new Date().getTime(), title: "Glitch Flanagan", image: "https://cdn.dribbble.com/users/1065176/screenshots/14498871/media/badff90693bb8693ef2a841b36d77562.jpg" },
    { bannerId: 5, createdAt: new Date().getTime(), title: "Boggie Woggie Mix Tour" },
  ]);

  return (
    <EventsContext.Provider value={{ selected, setSelected, events, setEvents }}>
      { children }
    </EventsContext.Provider>
  );
}

export default EventsContext;

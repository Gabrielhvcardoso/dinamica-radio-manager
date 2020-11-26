import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import React from 'react';
import BannerList from './components/BannerList';
import BannerModal from './components/BannerModal';
import { EventsContextProvider } from './context';

const Events: React.FC = () => {
  return (
    <AnimatePresence>
      <EventsContextProvider>
        <AnimateSharedLayout>
          <BannerList className="screen-resize" />
          <BannerModal />
        </AnimateSharedLayout>
      </EventsContextProvider>
    </AnimatePresence>
  );
};

export default Events;

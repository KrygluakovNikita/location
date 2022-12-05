import React from 'react';
import { Sidebar } from '../components/Sidebar';
import './Feed.css';

export const Feed = () => {
  return (
    <>
      <Sidebar profile={true} />
      <div className='main'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi minus officia dignissimos repellat enim magnam at aliquid reprehenderit
        exercitationem pariatur ratione, nemo nam sit doloribus explicabo incidunt amet maxime eveniet!
      </div>
    </>
  );
};

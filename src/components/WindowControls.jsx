import useWindowStore from '#store/window';
import React from 'react';

const WindowControls = ({ target }) => {
  const { closeWindow } = useWindowStore();

  return (
    <div id="window-controls">
      <div className="close" onClick={() => closeWindow(target)} title="Close" />
      <div className="minimize" onClick={() => closeWindow(target)} title="Minimize" />
      <div className="maximize" title="Zoom" />
    </div>
  );
};

export default WindowControls;


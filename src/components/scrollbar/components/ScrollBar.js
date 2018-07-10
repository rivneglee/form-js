import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const ScrollBar = ({ className, style, children }) => (
  <Scrollbars className={className} style={{ ...style }}>
    {children}
  </Scrollbars>
);

export default ScrollBar;

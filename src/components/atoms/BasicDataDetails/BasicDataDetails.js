import React from 'react';
import StyledBasicDataDetails from './StyledBasicDataDetails';

const BasicDataDetails = ({ type, content, children }) => { //pass props instead of using composition - children
  return (
    <StyledBasicDataDetails className={type}>
      {children} <span className={type}>{content}</span>
    </StyledBasicDataDetails>
  );
};

export default BasicDataDetails;

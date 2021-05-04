import React from 'react';
import StyledBasicDataContent from './StyledBasicDataContent';
import BasicDataDetails from 'components/atoms/BasicDataDetails/BasicDataDetails';

const BasicDataContent = ({ oneMilion, sum, today, type }) => { //pass props instead of using composition - children
  return (
    <StyledBasicDataContent>
      <BasicDataDetails type={type} content={sum}>
        Suma:
      </BasicDataDetails>
      <BasicDataDetails type={type} content={today}>
        Nowe dzisiaj:
      </BasicDataDetails>
      <BasicDataDetails type={type} content={oneMilion}>
        Na 1 milion:
      </BasicDataDetails>
    </StyledBasicDataContent>
  );
};

export default BasicDataContent;

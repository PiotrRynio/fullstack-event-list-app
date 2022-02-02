import React from 'react';
import { Text } from './FetchingStatus.styles';

export enum FETCHING_STATUS {
  'ERROR' = 'ERROR',
  'LOADING' = 'LOADING',
  'NO_RESULTS' = 'NO_RESULTS',
}

type FetchingStatusProps = {
  fetchingStatus?: FETCHING_STATUS;
};

export const FetchingStatus = ({ fetchingStatus }: FetchingStatusProps) => {
  if (fetchingStatus === 'ERROR') {
    return <Text role="status">Api error...</Text>;
  }
  if (fetchingStatus === 'LOADING') {
    return <Text role="status">Loading...</Text>;
  }
  if (fetchingStatus === 'NO_RESULTS') {
    return <Text role="status">No results!</Text>;
  }
  return <></>;
};

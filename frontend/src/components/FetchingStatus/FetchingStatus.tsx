import React from 'react';
import { Text } from './FetchingStatus.styles';

export type FetchingStatusProps = {
  isError: boolean;
  isLoading: boolean;
  isNoResults: boolean;
};

export const FetchingStatus = ({ isError, isLoading, isNoResults }: FetchingStatusProps) => {
  if (isError) {
    return <Text role="status">Api error...</Text>;
  }
  if (isLoading) {
    return <Text role="status">Loading...</Text>;
  }
  if (isNoResults) {
    return <Text role="status">No results!</Text>;
  }
  return <></>;
};

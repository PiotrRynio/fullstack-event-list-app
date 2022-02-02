import React from 'react';
import { Text } from './FetchingStatus.styles';

export type FetchingStatusProps = {
  isError: boolean;
  isLoading: boolean;
};

export const FetchingStatus = ({ isError, isLoading }: FetchingStatusProps) => {
  if (isError) {
    return <Text role="status">Api error...</Text>;
  }
  if (isLoading) {
    return <Text role="status">Loading...</Text>;
  }
  return <></>;
};

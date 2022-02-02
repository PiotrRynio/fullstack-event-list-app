export enum ErrorCodes {
  NETWORK_ERROR = 'NETWORK_ERROR',
  NOT_FOUND = 'NOT_FOUND',
}

export const validateResponse = async (response: Response) => {
  if (!response.ok) {
    const errorResponse = await response.json();
    if (errorResponse.status === 404) {
      throw new Error(ErrorCodes.NOT_FOUND);
    }
    throw new Error(ErrorCodes.NETWORK_ERROR);
  }
};

import { ErrorOutput } from '../types/error-output';

export const hasErrors = (response: object): response is ErrorOutput => {
  if ('errors' in response) {
    return true;
  }

  return false;
};

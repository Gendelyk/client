import { appConfig } from '@config/app';
import axios from 'axios';

export const initAxios = (): void => {
  axios.defaults.baseURL = appConfig.apiUrl;
  console.log('appConfig.apiUrl', appConfig.apiUrl)
  axios.defaults.timeout = 12000;
  axios.defaults.withCredentials = true;
};
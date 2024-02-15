import axios, { CreateAxiosDefaults } from 'axios';
import { Keys, getFromAsyncStorage } from 'utils/asyncStorage';

const client = axios.create({
  baseURL: 'https://api.podify.shop/',
});

const baseURL = 'https://api.podify.shop/'

type headers = CreateAxiosDefaults<any>['headers']

export const getClient = async (headers?: headers) => {
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);

  if(!token) return axios.create({
    baseURL
  })

  const defaultHeaders = {
    Authorization: 'Bearer ' + token,
    ...headers
  }

  return axios.create({baseURL, headers: defaultHeaders})
}

export default client;

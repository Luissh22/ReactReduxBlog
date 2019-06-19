import axios from 'axios';

export const jsonPlaceholderService = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

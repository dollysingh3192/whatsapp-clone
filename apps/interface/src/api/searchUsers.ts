import { API_URL } from '../constants';
import { SearchResult } from '../types';
import axios from 'axios';

//update below function to use axios and get call to `${API_URL}/users` 

export const searchUsers = async (query: string): Promise<SearchResult[]> => {
  const response = await axios.get(`${API_URL}/api/v1/user/all`, {
    params: {
      query,
    },
  });

  return response.data;
};
import {create} from 'apisauce';

const apiClient = create({
  baseURL: 'http://172.20.10.7:8000',
});

export default apiClient;

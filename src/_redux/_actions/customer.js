import { createAsyncAction } from 'redux-promise-middleware-actions'
import Axios from 'axios';
import config from '../../configs/config'

export const getCustomer = createAsyncAction('GET_CUSTOMER', async (token) => {
  const res = await Axios({
    baseURL: config.host.concat(`customers`),
    headers: {'Authorization': `Bearer ${token}`}
  });
  return res.data;
});
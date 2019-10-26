import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'
import Axios from 'axios';
import config from '../../configs/config'

export const getCheckin = createAsyncAction('GET_CHECKIN', async (token) => {
  const res = await Axios({
    baseURL: config.host.concat(`checkin`),
    headers: {'Authorization': `Bearer ${token}`}
  });
  return res.data;
});
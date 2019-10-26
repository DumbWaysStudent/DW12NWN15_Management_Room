import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'
import Axios from 'axios';
import config from '../../configs/config'

export const getRoom = createAsyncAction('GET_ROOM', async (token) => {
  const res = await Axios({
    baseURL: config.host.concat(`rooms`),
    headers: {'Authorization': `Bearer ${token}`}
  });
  return res.data;
});
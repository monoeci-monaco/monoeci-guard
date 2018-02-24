import axios from 'axios';

import AppError from '../../shared/errors/AppError';
import UnknownError from '../../shared/errors/UnknownError';

const apiClient = axios.create({
  baseURL: '/api/'
});

export const get = wrap('get');
export const post = wrap('post');
export const put = wrap('put');
export const del = wrap('delete');

export default { get, post, put, delete: del };

function wrap(method) {
  return function() {
    return call(method, arguments);
  };
}

async function call(method, args) {
  try {
    const result = await apiClient[method].apply(apiClient, args);
    return result.data;
  } catch (err) {
    if (err.response.data && err.response.data.code) {
      throw new AppError(err.response.data);
    } else {
      console.error(err);
      throw new UnknownError();
    }
  }
}
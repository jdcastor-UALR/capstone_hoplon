import {clearToken, getToken} from "./auth";
import {URL_AUTH, URL_CREATE_REGISTRATION_REQUEST} from "./urls";

function catchErrorResponse(response) {
  if (response.status === 401 && getToken()) {
    clearToken();
  }

  if (response.status >= 400 && response.status < 600) {
    throw new Error(response.statusText);
  }
}

const injectHeader = (options, ignoreAuth=false) => {
  let headers = {};

  const addJsonHeader = options.method === 'POST' || options.method === 'PUT';
  const token = getToken();

  if (!addJsonHeader && !token) {
    return options;
  }

  if (addJsonHeader) {
    headers['Content-Type'] = 'application/json';
  }
  if (token && !ignoreAuth) {
    headers['Authorization'] = `Token ${token}`;
  }
  options.headers = headers;

  return options;
};

const APIService = {
  authenticate: async (username, password) => {
    const options = {method: 'POST', body: JSON.stringify({username: username, password: password})};
    const response = await fetch(URL_AUTH, injectHeader(options, true));
    catchErrorResponse(response);
    return response.json();
  },

  get: async (url) => {
    const options = { method: 'GET' };
    const response = await fetch(url, injectHeader(options));
    catchErrorResponse(response);
    return response.json();
  },

  post: async (url, data, ignoreAuth=false) => {
    const options = { method: 'POST', body: JSON.stringify(data) };
    const response = await fetch(url, injectHeader(options, ignoreAuth));
    catchErrorResponse(response);
    return response.json();
  },

  put: async (url, data) => {
    const options = { method: 'PUT', body: JSON.stringify(data) };
    const response = await fetch(url + data.id.toString(), injectHeader(options));
    catchErrorResponse(response);
    return response.json();
  },

  delete: async (url, id) => {
    const options = { method: 'DELETE' };
    const response = await fetch(url + id.toString(), injectHeader(options));
    catchErrorResponse(response);
    return response;
  }
}

export default APIService;

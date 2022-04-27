import {getToken, saveToken} from "./auth";
import {URL_AUTH} from "./urls";

function catchErrorResponse(response) {
  if (response.status >= 400 && response.status < 600) {
    throw new Error(response.statusText);
  }
}

function getHeaders(isJSON=false) {
  let result = {};

  if (isJSON) {
    result['Content-Type'] = 'application/json';
  }

  const token = getToken();
  if (token) {
    result['Authorization'] = `Token ${token}`;
  }

  if (!isJSON && !token) {
    return null;
  }
  return result;
}

const APIService = {
  authenticate: async (username, password) => {
    const response = await fetch(URL_AUTH);
    catchErrorResponse(response);
    const data = response.json();
    saveToken(data);
    return data;
  },

  get: async (url) => {
    const options = { method: 'GET', headers: getHeaders() };
    const response = await fetch(url, options);
    catchErrorResponse(response);
    return response.json();
  },

  post: async (url, data) => {
    const options = { method: 'POST', headers: getHeaders(true), body: JSON.stringify(data) };
    const response = await fetch(url, options);
    catchErrorResponse(response);
    return response.json();
  },

  put: async (url, data) => {
    const options = { method: 'PUT', headers: getHeaders(true), body: JSON.stringify(data) };
    const response = await fetch(url + data.id.toString(), options);
    catchErrorResponse(response);
    return response.json();
  },

  delete: async (url, id) => {
    const options = { method: 'DELETE', headers: getHeaders() };
    const response = await fetch(url + id.toString(), options);
    catchErrorResponse(response);
    return response;
  }
}

export default APIService;

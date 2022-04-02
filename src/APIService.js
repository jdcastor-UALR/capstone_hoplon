function catchErrorResponse(response) {
  if (response.status >= 400 && response.status < 600) {
    throw new Error(response.statusText);
  }
}

const APIService = {
  get: async (url) => {
    const response = await fetch(url);
    catchErrorResponse(response);
    return response.json();
  },

  post: async (url, data) => {
    const options = { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) };
    const response = await fetch(url, options);
    catchErrorResponse(response);
    return response.json();
  },

  put: async (url, data) => {
    const options = { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data) };
    const response = await fetch(url + data.id.toString(), options);
    catchErrorResponse(response);
    return response.json();
  },

  delete: async (url, id) => {
    const options = { method: 'DELETE' };
    const response = await fetch(url + id.toString(), options);
    catchErrorResponse(response);
    return response;
  }
}

export default APIService;

import Cookies from 'js-cookie';

const getToken = () => {
  return Cookies.get('token');
};

const clearToken = () => {
  Cookies.remove('token');
};

const saveToken = (userToken) => {
  Cookies.set('token', userToken.token);
};

export { getToken, clearToken, saveToken };

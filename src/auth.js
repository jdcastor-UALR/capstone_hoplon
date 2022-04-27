

const getToken = () => {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
};

const saveToken = (userToken) => {
  sessionStorage.setItem('token', JSON.stringify(userToken));
};

export { getToken, saveToken };

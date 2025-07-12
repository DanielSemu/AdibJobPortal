export const getAccessToken = () => localStorage.getItem('accessToken') || '';

export const setAccessToken = (token) => {
  if (token) {
    localStorage.setItem('accessToken', token);
  } else {
    localStorage.removeItem('accessToken');
  }
};
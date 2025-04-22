const TOKEN = 'token';
const getToken = () => {
  return localStorage.getItem(TOKEN);
};
const setToken = (token) => {
  return localStorage.setItem(TOKEN, token);
}
const removeToken = () => {
  return localStorage.removeItem(TOKEN);
}
export { getToken, setToken, removeToken };
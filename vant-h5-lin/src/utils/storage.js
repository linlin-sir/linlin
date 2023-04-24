const KEY = 'token';
export const getToken = () => {
    return localStorage.getItem(KEY)
};
export const setToken = (token) => {
    return localStorage.setItem(KEY,token)
};
export const delToken = () => {
    return localStorage.removeItem(KEY)
};
const ACESS_TOKEN_KEY = "TOKEN";

export const tokenService = {
  save(accessToken) {
    localStorage.setItem(ACESS_TOKEN_KEY, accessToken);
    sessionStorage.setItem(ACESS_TOKEN_KEY, accessToken);
  },
  get(accessToken) {
    return localStorage.getItem(ACESS_TOKEN_KEY);
    //return sessionStorage.getItem(ACESS_TOKEN_KEY);
  },
  delete(accessToken) {
    localStorage.removeItem(ACESS_TOKEN_KEY);
    sessionStorage.removeItem(ACESS_TOKEN_KEY);
  },
};

import nookies from "nookies";

const ACESS_TOKEN_KEY = "TOKEN";

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

export const tokenService = {
  save(accessToken, ctx = null) {
    globalThis?.localStorage?.setItem(ACESS_TOKEN_KEY, accessToken);
    globalThis?.sessionStorage?.setItem(ACESS_TOKEN_KEY, accessToken);
    nookies.set(ctx, ACESS_TOKEN_KEY, accessToken, {
      maxAge: ONE_YEAR,
      path: "/",
    });
  },

  get(ctx = null) {
    const cookies = nookies.get(ctx);
    return cookies[ACESS_TOKEN_KEY] || "";

    // return globalThis?.localStorage?.getItem(ACESS_TOKEN_KEY);
    //return sessionStorage.getItem(ACESS_TOKEN_KEY);
  },

  delete(ctx = null) {
    globalThis?.localStorage?.removeItem(ACESS_TOKEN_KEY);
    globalThis?.sessionStorage?.removeItem(ACESS_TOKEN_KEY);
    nookies.destroy(ctx, ACESS_TOKEN_KEY);
  },
};

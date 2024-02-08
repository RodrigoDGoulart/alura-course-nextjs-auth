import { REFRESH_TOKEN } from "../../../pages/api/refresh";
import { tokenService } from "../../services/auth/tokenService";
import nookies from "nookies";

// arquitetura exagonal
// ports & adapters

export async function HttpClient(fetchUrl, fetchOptions) {
  return fetch(fetchUrl, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
  }).then(async (res) => {
    const body = await res.json();
    if (!fetchOptions.refresh || res.status !== 401) {
      return {
        status: res.status,
        body,
      };
    } else {
      console.log("tentando de novo com refresh...");
      // middleware para atualizar token
      // 1. tentar atualizar token
      const isServer = Boolean(fetchOptions?.ctx);
      const currentRefreshToken =
        fetchOptions?.ctx?.req?.cookies[REFRESH_TOKEN];

      const retorno = await HttpClient("http://localhost:3000/api/refresh", {
        method: isServer ? "PUT" : "GET",
        body: isServer ? { refresh_token: currentRefreshToken } : undefined,
      });
      if (retorno.status === 200) {
        const newAccessToken = retorno.body.data.access_token;
        const newRefreshToken = retorno.body.data.refresh_token;

        if (isServer) {
          nookies.set(fetchOptions?.ctx, REFRESH_TOKEN, newRefreshToken, {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
          });
        }

        // 2. guarda os novos tokens
        tokenService.save(newAccessToken);

        // 3. tenta rodar o request anterior
        const retryResponse = await HttpClient(fetchUrl, {
          ...fetchOptions,
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });

        return retryResponse;
      } else {
        return {
          status: res.status,
          body,
        };
      }
    }
  });
}

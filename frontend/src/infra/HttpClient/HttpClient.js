import { tokenService } from "../../services/auth/tokenService";

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
      const retorno = await HttpClient("/api/refresh", {
        method: "GET",
      });
      const newAccessToken = retorno.body.data.access_token;

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
    }
  });
}

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
    console.log(res);
    return {
      status: res.status,
      body: await res.json(),
    };
  });
}

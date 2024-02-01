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
    return {
      status: res.status,
      body,
    };
  });
}

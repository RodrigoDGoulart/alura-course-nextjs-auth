import { HttpClient } from "../../infra/HttpClient/httpClient";

export const authService = {
  async login({ username, password }) {
    return await HttpClient(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
      {
        method: "POST",
        body: {
          username,
          password,
        },
      }
    ).then(async (res) => {
      return res.status;
    });
  },
};

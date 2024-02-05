import { HttpClient } from "../../infra/HttpClient/httpClient";
import { tokenService } from "./tokenService";

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
      if (res.status === 200) {
        tokenService.save(res.body.data.access_token);
      }
      return res.status;
    });
  },

  async getSession(ctx) {
    const token = tokenService.get(ctx);

    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/session`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => ({
      data: res.body.data,
      status: res.status,
    }));
  },
};

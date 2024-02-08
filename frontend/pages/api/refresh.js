import nookies from "nookies";
import { HttpClient } from "../../src/infra/HttpClient/HttpClient";

export const REFRESH_TOKEN = "REFRESH_TOKEN_NAME";

const controllers = {
  async storeRefreshToken(req, res) {
    const ctx = { req, res };

    nookies.set(ctx, REFRESH_TOKEN, req.body.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
      path: '/'
    });

    res.json({
      hello: "world",
    });
  },

  async displayCookies(req, res) {
    const ctx = { req, res };
    res.json({
      data: {
        cookies: nookies.get(ctx),
      },
    });
  },

  async regenerateTokens(req, res) {
    const ctx = { req, res };
    const cookies = nookies.get(ctx);
    const refresh_token = cookies[REFRESH_TOKEN] || req.body.refresh_token;

    const retorno = await HttpClient(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/refresh`,
      {
        method: "POST",
        body: {
          refresh_token,
        },
      }
    );


    
    if (retorno.status === 200) {
      nookies.set(ctx, REFRESH_TOKEN, retorno.body.data.refresh_token, {
        httpOnly: true,
        sameSite: "lax",
        path: '/',
      });

      res.status(200).json({
        status: 200,
        data: retorno.body.data,
      });
    } else {
      res.status(retorno.status).json({
        status: retorno.status,
        message:
          retorno.status === 401
            ? "Não autorizado"
            : "Erro interno do servidor",
      });
    }
  },
};

const controlledBy = {
  POST: controllers.storeRefreshToken,
  GET: controllers.regenerateTokens,
  PUT: controllers.regenerateTokens,
};

export default function handler(req, res) {
  if (controlledBy[req.method]) return controlledBy[req.method](req, res);

  res.status(404).json({
    status: 404,
    message: "not found",
  });
}

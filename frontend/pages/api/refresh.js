import nookies from "nookies";

const REFRESH_TOKEN = "REFRESH_TOKEN_NAME";

const controllers = {
  async storeRefreshToken(req, res) {
    const ctx = { req, res };
    console.log(req.body);

    nookies.set(ctx, REFRESH_TOKEN, req.body.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
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
};

const controlledBy = {
  POST: controllers.storeRefreshToken,
  GET: controllers.displayCookies,
};

export default function handler(req, res) {
  if (controlledBy[req.method]) return controlledBy[req.method](req, res);

  res.status(404).json({
    status: 404,
    message: "not found",
  });
}

import { authService } from "./authService";

export function withSession(callback) {
  return async (ctx = null) => {
    const session = await authService.getSession(ctx);
    const modifiedCtx = {
      ...ctx,
      req: {
        ...ctx.req,
        session: session.data,
      },
    };
    return session.status === 200
      ? callback(modifiedCtx)
      : {
          redirect: {
            permanent: false,
            destination: "/?error=401",
          },
        };
  };
}

import { withSession } from "../src/services/auth/session";

export default function AuthPageSSR(props) {
  return (
    <div>
      <h1>Auth Page SSR</h1>
      <p>
        <a href="/logout">Logout</a>
      </p>
      {props ? <pre>{JSON.stringify(props, null, 2)}</pre> : <></>}
    </div>
  );
}

// decorator pattern
export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session,
    },
  };
});

// função inicial

// export async function getServerSideProps(ctx) {
//   const session = await authService.getSession(ctx);

//   return session.status === 200
//     ? {
//         props: {
//           session: session.data,
//         },
//       }
//     : {
//         redirect: {
//           permanent: false,
//           destination: "/?error=401",
//         },
//       };
// }

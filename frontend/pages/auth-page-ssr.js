import { tokenService } from "../src/services/auth/tokenService";

export default function AuthPageSSR(props) {
  return (
    <div>
      <h1>Auth Page SSR</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      token: tokenService.get(ctx),
    },
  };
}

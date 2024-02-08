import React from "react";
import { authService } from "../src/services/auth/authService";
import { useRouter } from "next/router";

function useSession() {
  const [session, setSession] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    authService
      .getSession()
      .then((res) => {
        setError(res.status !== 200);
        res.status === 200 && setSession(res.data);
        console.log(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    error,
    data: session,
  };
}

// HOC = High Order Component
function withSessionHOC(Component) {
  return function Wrapper(props) {
    const session = useSession();
    const router = useRouter();

    if (session.error) {
      router.push("/?error=401");
    }

    const modifiedProps = {
      ...props,
      session: session.data
    }
    return <Component {...modifiedProps} />;
  };
}

function AuthPageStatic(props) {
  return (
    <div>
      <h1>Auth Page Static</h1>
      <p>
        <a href="/logout">Logout</a>
      </p>
      <pre>{JSON.stringify(props.session, null, 2)}</pre>
    </div>
  );
}

export default withSessionHOC(AuthPageStatic);

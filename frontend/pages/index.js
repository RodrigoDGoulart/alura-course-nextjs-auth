import React from "react";
import {useRouter} from 'next/router';

export default function HomeScreen() {
  const router = useRouter();

  const [values, setValues] = React.useState({
    usuario: "",
    senha: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // router.push('/auth-page-ssr');
    router.push('/auth-page-static');
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Usuário"
          name="usuario"
          defaultValue="omariosouto"
          value={values.usuario}
          onChange={handleChange}
        />
        <input
          placeholder="Senha"
          name="senha"
          type="password"
          defaultValue="safepassword"
          value={values.senha}
          onChange={handleChange}
        />
        <div>
          <button>Entrar</button>
        </div>
      </form>
      {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
    </div>
  );
}

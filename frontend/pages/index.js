import React from "react";
import { useRouter } from "next/router";
import { authService } from "../src/services/auth/authService";

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
    // não recarregar página
    event.preventDefault();

    // requisição p/ api
    authService
      .login({
        username: values.usuario,
        password: values.senha,
      })
      .then((res) => {
        switch (res) {
          case 401: // não autorizado
            alert("Email/senha inválido");
            break;
          case 200: // tudo certo
            router.push("/auth-page-static");
            // router.push("/auth-page-ssr");
            break;
          default: // demais erros
            alert("Erro interno do servidor, tente novamente mais tarde.");
        }
      });
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
        <div>
          <a href="/auth-page-ssr">SSR</a>
        </div>
        <div>
          <a href="/auth-page-static">STATIC</a>
        </div>
      </form>
      {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
    </div>
  );
}

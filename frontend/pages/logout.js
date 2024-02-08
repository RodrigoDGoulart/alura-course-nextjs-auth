import { useRouter } from "next/router";
import { tokenService } from "../src/services/auth/tokenService";
import React from "react";
import { HttpClient } from "../src/infra/HttpClient/HttpClient";

export default function LogoutPage() {
  const router = useRouter();

  React.useEffect(async () => {
    await HttpClient("/api/refresh", {
      method: "DELETE",
    });
    tokenService.delete();
    router.push("/");
  }, []);

  return <div>Você será redirecionado em instantes...</div>;
}

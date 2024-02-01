export const authService = {
  async login({ username, password }) {
    return await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then(async (res) => {
      if (!res.ok) return 401;
      const body = await res.json();
      console.log(body);
      return 200;
    });
  },
};

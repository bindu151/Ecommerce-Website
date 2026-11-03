
import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

function AuthPage() {
  const [page, setPage] = useState("login");

  return (
    <>
      {page === "login" ? (
        <Login onRegister={() => setPage("register")} />
      ) : (
        <Register onLogin={() => setPage("login")} />
      )}
    </>
  );
}

export default AuthPage;

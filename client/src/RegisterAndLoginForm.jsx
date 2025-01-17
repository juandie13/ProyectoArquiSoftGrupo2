import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext.jsx";
import * as v from 'valibot';

const EmailSchema = v.pipe(v.string(), v.email())

export default function RegisterAndLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("register");
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
  async function handleSubmit(ev) {
    ev.preventDefault();
    const url = isLoginOrRegister === "register" ? "register" : "login";

    const result = v.safeParse(EmailSchema, username)

    if (!result.success) {
      alert("Email invalido")
      return
    }

    const { data } = await axios.post(url, { username, password });
    setLoggedInUsername(username);
    setId(data.id);
  }
  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          type="text"
          placeholder="Usuario"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          type="password"
          placeholder="Contraseña"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          {isLoginOrRegister === "register" ? "Registrarse" : "Iniciar Sesión"}
        </button>
        <div className="text-center mt-2">
          {isLoginOrRegister === "register" && (
            <div>
              ¿Ya estás registrado?
              <button
                className="ml-1"
                onClick={() => setIsLoginOrRegister("login")}
              >
                Iniciar Sesión
              </button>
            </div>
          )}
          {isLoginOrRegister === "login" && (
            <div>
              ¿No tienes una cuenta?
              <button
                className="ml-1"
                onClick={() => setIsLoginOrRegister("register")}
              >
                Registrarse
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
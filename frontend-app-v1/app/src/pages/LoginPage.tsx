import { useState } from "react";
import Login from "../components/pageComponents/Login/Login";
import authService from "../services/authService";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  async function submitFunction(userCredentials: UserLogin) {
    try {
      await authService.login(userCredentials);
    } catch (err) {
      setErrorMessage("Incorrect username or password!");
    }
  }
  return <Login submitFunction={submitFunction} errorMessage={errorMessage} />;
}

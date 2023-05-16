import { useState } from "react";
import Register from "../components/pageComponents/Register/Register";
import userService from "../services/userService";

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [isRegisteredSuccessfully, setIsRegisteredSuccessfully] =
    useState<boolean>(false);
  function submitFunction(userCredentials: UserRegister) {
    setIsRegistering(true);
    userService
      .register(userCredentials)
      .then(() => {
        setIsRegistering(false);
        setIsRegisteredSuccessfully(true);
      })
      .catch(() => {
        setIsRegistering(false);
        setErrorMessage("Username already taken!");
      });
  }
  return (
    <Register
      submitFunction={submitFunction}
      errorMessage={errorMessage}
      isRegistering={isRegistering}
      isRegisteredSuccessfully={isRegisteredSuccessfully}
    />
  );
}

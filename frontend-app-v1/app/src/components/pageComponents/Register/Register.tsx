import { FormEvent, useRef } from "react";
import styles from "./Register.module.css";
import SuccessfulRegister from "../SuccessfulRegister/SuccessfulRegister";

type RegisterProps = {
  submitFunction: (userCredentials: UserRegister) => void;
  errorMessage: string;
  isRegistering: boolean;
  isRegisteredSuccessfully: boolean;
};

export default function Register({
  submitFunction,
  errorMessage,
  isRegistering,
  isRegisteredSuccessfully,
}: RegisterProps) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    const RegisterCredentials: UserRegister = {
      username: usernameRef?.current?.value as string,
      fullName: fullNameRef?.current?.value as string,
      password: passwordRef?.current?.value as string,
    };
    submitFunction(RegisterCredentials);
  }
  return isRegisteredSuccessfully ? (
    <SuccessfulRegister />
  ) : (
    <div className={styles.wrapper}>
      <h1>Register</h1>
      <form onSubmit={submit} className={styles.form}>
        <label htmlFor="username">Username</label>
        <br />
        <input
          type="text"
          name="username"
          id="username"
          ref={usernameRef}
          placeholder="enter username"
          required
          pattern=".{4,}"
        />
        <br />
        <label htmlFor="fullName">Full name</label>
        <br />
        <input
          type="text"
          name="fullName"
          id="fullName"
          ref={fullNameRef}
          placeholder="enter Full name"
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          ref={passwordRef}
          placeholder="enter password"
          required
          pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}"
        />
        <br />
        <p>{errorMessage}</p>
        <br />
        <button>Register</button>
      </form>
      {isRegistering && <div className={styles["lds-dual-ring"]}></div>}
    </div>
  );
}

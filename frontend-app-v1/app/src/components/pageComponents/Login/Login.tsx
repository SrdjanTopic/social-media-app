import { FormEvent, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

type LoginProps = {
  submitFunction: (userCredentials: UserLogin) => void;
  errorMessage: string;
};

export default function Login({ submitFunction, errorMessage }: LoginProps) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    const loginCredentials: UserLogin = {
      username: usernameRef?.current?.value as string,
      password: passwordRef?.current?.value as string,
    };
    submitFunction(loginCredentials);
  }
  return (
    <div className={styles.wrapper}>
      <h1>Login</h1>
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
        />
        <br />
        <Link to={"/register"}>Register</Link>
        <p>{errorMessage}</p>
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

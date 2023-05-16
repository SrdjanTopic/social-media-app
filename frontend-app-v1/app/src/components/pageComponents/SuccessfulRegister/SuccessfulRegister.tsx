import styles from "./SuccessfulRegister.module.css";
import { Link } from "react-router-dom";

export default function SuccessfulRegister() {
  return (
    <div className={styles.wrapperDiv}>
      <svg width="100" height="100">
        <polyline
          points="30,50 40,65 70,40"
          fill="none"
          stroke="#ffffff"
          stroke-width="5"
          stroke-miterlimit="10"
          stroke-linecap="round"
        />
        <circle
          fill="none"
          stroke="#ffffff"
          stroke-width="5"
          stroke-miterlimit="10"
          cx="50"
          cy="50"
          r="32.53"
        />
      </svg>
      <h1>Registration successful</h1>
      <Link to={"/"}>Login</Link>
    </div>
  );
}

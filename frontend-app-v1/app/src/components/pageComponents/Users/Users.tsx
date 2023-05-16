import { useRef } from "react";
import UserCard from "../../smallComponents/UserCard/UserCard";
import styles from "./Users.module.css";

type UsersProps = {
  users: User[];
  userAction: (userId: number, action: string) => void;
  filterUsers: (username: string, fullName: string) => void;
};

export default function Users({ users, userAction, filterUsers }: UsersProps) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);

  function handleFilterUsers() {
    if (usernameRef.current && fullNameRef.current)
      filterUsers(usernameRef.current.value, fullNameRef.current.value);
  }

  return (
    <>
      <h1>Users</h1>
      <div className={styles.inputsWrapper}>
        <input
          ref={fullNameRef}
          type="text"
          placeholder="Search by Full Name"
        />
        <input ref={usernameRef} type="text" placeholder="Search by Username" />
      </div>
      <button className={styles.searchBtn} onClick={handleFilterUsers}>
        Search
      </button>
      <div className={styles.wrapper}>
        {users.map((user) => (
          <UserCard user={user} userAction={userAction} key={user.id} />
        ))}
      </div>
    </>
  );
}

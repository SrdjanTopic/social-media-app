import { useState, useEffect } from "react";
import userService from "../../services/userService";

type CustomStateHook = [
  User[],
  (newState: User[]) => void,
  (username: string | null, fullName: string | null) => void
];

export default function useGetUsers(
  username: string | null,
  fullName: string | null
): CustomStateHook {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    userService
      .getNonFriends(username, fullName)
      .then((users) => setUsers(users))
      .catch((err) => console.log(err));
  }, []);

  const filterSetState = (username: string | null, fullName: string | null) => {
    userService
      .getNonFriends(username, fullName)
      .then((users) => setUsers(users))
      .catch((err) => console.log(err));
  };

  const normalSetUsers = (newState: User[]) => {
    setUsers(newState);
  };

  return [users, normalSetUsers, filterSetState];
}

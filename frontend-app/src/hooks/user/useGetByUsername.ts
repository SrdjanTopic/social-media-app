import { useState, useEffect } from "react";
import userService from "../../services/userService";

export default function useGetByUsername(
  username: string | undefined
): User | null {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (username)
      userService
        .getUserByUsername(username)
        .then((user) => setCurrentUser(user))
        .catch((err) => console.log(err));
    else setCurrentUser(null);
  }, [username]);

  return currentUser;
}

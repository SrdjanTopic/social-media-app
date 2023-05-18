import { useState, useEffect } from "react";
import userService from "../../services/userService";

export default function useGetByUsername(
  username?: string
): User | null | undefined {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

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

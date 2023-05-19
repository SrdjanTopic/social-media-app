import { useState, useEffect } from "react";
import userService from "../../services/userService";

export default function useGetById(
  userId?: number
): CustomStateHook<User | null | undefined> {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    if (userId)
      userService
        .getUserById(userId)
        .then((user) => setUser(user))
        .catch((err) => console.log(err));
    else setUser(null);
  }, [userId]);

  function customSetState(newUser: User | null | undefined) {
    setUser(newUser);
  }

  return [user, customSetState];
}

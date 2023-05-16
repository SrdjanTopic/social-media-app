import { useState, useEffect } from "react";
import myProfileService from "../../services/myProfileService";

export default function useCurrentUser(): User | null {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    myProfileService
      .getCurrentUser()
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log(err));
  }, []);

  return currentUser;
}

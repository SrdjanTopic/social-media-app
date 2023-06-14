import { useState, useEffect } from "react";
import friendService from "../../services/friendService";

type CustomStateHook = [User[], (newState: User[]) => void];

export default function useGetFriends(userId: number | null): CustomStateHook {
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    if (userId != null)
      friendService
        .getFriendsForUser(userId)
        .then((friends) => setFriends(friends))
        .catch((err) => console.log(err));
    else
      friendService
        .getMyFriends()
        .then((friends) => setFriends(friends))
        .catch((err) => console.log(err));
  }, [userId]);

  return [friends, setFriends];
}

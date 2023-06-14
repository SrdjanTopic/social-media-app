import { useState, useEffect } from "react";
import friendService from "../../services/friendService";

type CustomStateHook = [boolean, (newState: boolean) => void];

export default function useCheckAreFriends(userId: number): CustomStateHook {
  const [isMyFriend, setIsMyFriend] = useState<boolean>(false);

  useEffect(() => {
    friendService
      .isMyFriend(userId)
      .then((isMyFriend) => setIsMyFriend(isMyFriend))
      .catch((err) => console.log(err));
  }, [userId]);

  return [isMyFriend, setIsMyFriend];
}

import { useState, useEffect } from "react";
import friendRequestService from "../../services/friendRequestService";

type CustomStateHook = [User[], (newState: User[]) => void];

export default function useGetFriendRequests(): CustomStateHook {
  const [requests, setRequests] = useState<User[]>([]);

  useEffect(() => {
    friendRequestService
      .getFriendRequests()
      .then((requests) => setRequests(requests))
      .catch((err) => console.log(err));
  }, []);

  const customSetState = (newState: User[]) => {
    setRequests(newState);
  };

  return [requests, customSetState];
}

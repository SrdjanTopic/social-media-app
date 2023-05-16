import { useState, useEffect } from "react";
import friendRequestService from "../../services/friendRequestService";

export default function useGetFrientRequestCount() {
  const [count, setIsRequestSent] = useState<number>(0);

  useEffect(() => {
    friendRequestService
      .getFriendRequestCount()
      .then((count) => setIsRequestSent(count))
      .catch((err) => console.log(err));
  }, []);

  return count;
}

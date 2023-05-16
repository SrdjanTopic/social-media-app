import { useState, useEffect } from "react";
import friendRequestService from "../../services/friendRequestService";

type CustomStateHook = [boolean, (newState: boolean) => void];

export default function useCheckAmRequested(
  addresseeId: number
): CustomStateHook {
  const [amRequested, setAmRequested] = useState<boolean>(false);

  useEffect(() => {
    friendRequestService
      .amRequested(addresseeId)
      .then((amRequested) => setAmRequested(amRequested))
      .catch((err) => console.log(err));
  }, [addresseeId]);

  const customSetState = (newState: boolean) => {
    setAmRequested(newState);
  };

  return [amRequested, customSetState];
}

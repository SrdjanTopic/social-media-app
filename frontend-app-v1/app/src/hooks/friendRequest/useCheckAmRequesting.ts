import { useState, useEffect } from "react";
import friendRequestService from "../../services/friendRequestService";

type CustomStateHook = [boolean, (newState: boolean) => void];

export default function useCheckAmRequesting(
  addresseeId: number
): CustomStateHook {
  const [amRequesting, setAmRequesting] = useState<boolean>(false);

  useEffect(() => {
    friendRequestService
      .amRequesting(addresseeId)
      .then((amRequesting) => setAmRequesting(amRequesting))
      .catch((err) => console.log(err));
  }, [addresseeId]);

  const customSetState = (newState: boolean) => {
    setAmRequesting(newState);
  };

  return [amRequesting, customSetState];
}

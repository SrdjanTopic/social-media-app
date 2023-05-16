import FriendRequests from "../components/pageComponents/FriendRequests/FriendRequests";
import useGetFriendRequests from "../hooks/friendRequest/useGetFriendRequests";
import friendRequestService from "../services/friendRequestService";

export default function FriendRequestsPage() {
  const [requests, setRequests] = useGetFriendRequests();

  function requestAction(userId: number, action: string) {
    if (action == "accept")
      friendRequestService
        .acceptRequest(userId)
        .then(() => setRequests(requests.filter((req) => req.id !== userId)))
        .catch((err) => console.log(err));
    else
      friendRequestService
        .deleteRequest(userId)
        .then(() => setRequests(requests.filter((req) => req.id !== userId)))
        .catch((err) => console.log(err));
  }

  return <FriendRequests requests={requests} requestAction={requestAction} />;
}

import useGetFriends from "../hooks/friend/useGetFriends";
import friendService from "../services/friendService";
import { useUsers } from "../components/pageComponents/Profile/Profile";
import UsersFriends from "../components/pageComponents/UsersFriends/UsersFriends";
import friendRequestService from "../services/friendRequestService";

export default function UsersFriendsPage() {
  const users = useUsers();
  const [friends, setFriends] = useGetFriends(users.user.id);

  function userAction(userId: number, action: string) {
    if (action == "unfriend")
      friendService
        .unfriendUser(userId)
        .then(() =>
          setFriends(friends.filter((friend) => friend.id !== userId))
        )
        .catch((err) => console.log(err));
    if (action == "friendRequest") {
      friendRequestService
        .sendFriendRequest(userId)
        .catch((err) => console.log(err));
    }
  }
  return (
    <UsersFriends
      friends={friends}
      userAction={userAction}
      currentUser={users.currentUser}
    />
  );
}

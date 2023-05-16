import Friends from "../components/pageComponents/Friends/Friends";
import useGetFriends from "../hooks/friend/useGetFriends";
import friendService from "../services/friendService";

export default function FriendsPage() {
  const [friends, setFriends] = useGetFriends(null);

  function friendAction(userId: number, action: string) {
    if (action == "unfriend")
      friendService
        .unfriendUser(userId)
        .then(() =>
          setFriends(friends.filter((friend) => friend.id !== userId))
        )
        .catch((err) => console.log(err));
  }
  return <Friends friends={friends} userAction={friendAction} />;
}

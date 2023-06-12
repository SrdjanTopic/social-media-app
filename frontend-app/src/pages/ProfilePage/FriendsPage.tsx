import { useOutletContext } from "react-router-dom";
import useGetFriends from "../../hooks/friend/useGetFriends";
import UserCard from "../../components/smallComponents/UserCard/UserCard";

export default function FriendsPage() {
  const user = useOutletContext<{ user: User }>().user;
  const [friends, setFriends] = useGetFriends(user.id);

  function setUser(user: User) {
    setFriends(
      friends.map((friend) => {
        if (friend.id === user.id) return user;
        else return friend;
      })
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "1rem",
      }}
    >
      {friends.map((friend) => (
        <UserCard user={friend} key={friend.id} setUser={setUser} />
      ))}
    </div>
  );
}

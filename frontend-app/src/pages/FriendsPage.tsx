import UserCard from "../components/smallComponents/UserCard/UserCard";
import useGetFriends from "../hooks/friend/useGetFriends";

export default function FriendsPage() {
  const [friends, setFriends] = useGetFriends(null);

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
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: "1rem",
      }}
    >
      {friends.map((friend) => (
        <UserCard user={friend} key={friend.id} setUser={setUser} />
      ))}
    </div>
  );
}

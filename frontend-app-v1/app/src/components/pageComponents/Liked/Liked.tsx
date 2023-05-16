type LikedProps = {
  currentUser: User | null;
  user: User;
  isMyFriend: boolean;
};

export default function Liked({ user, currentUser, isMyFriend }: LikedProps) {
  return currentUser?.username === user.username ? (
    <h1>Liked</h1>
  ) : (
    <h2>You cannot view liked posts by other users</h2>
  );
}

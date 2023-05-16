type DislikedProps = {
  currentUser: User | null;
  user: User;
  isMyFriend: boolean;
};

export default function Disliked({
  user,
  currentUser,
  isMyFriend,
}: DislikedProps) {
  return currentUser?.username === user.username ? (
    <h1>Disliked</h1>
  ) : (
    <h2>You cannot view disliked posts by other users</h2>
  );
}

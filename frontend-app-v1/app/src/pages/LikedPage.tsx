import Liked from "../components/pageComponents/Liked/Liked";
import { useUsers } from "../components/pageComponents/Profile/Profile";

export default function LikedPage() {
  const users = useUsers();
  return (
    <Liked
      user={users.user}
      currentUser={users.currentUser}
      isMyFriend={users.isMyFriend}
    />
  );
}

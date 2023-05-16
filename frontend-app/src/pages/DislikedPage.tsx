import Disliked from "../components/pageComponents/Disliked/Disliked";
import { useUsers } from "../components/pageComponents/Profile/Profile";

export default function DislikedPage() {
  const users = useUsers();
  return (
    <Disliked
      user={users.user}
      currentUser={users.currentUser}
      isMyFriend={users.isMyFriend}
    />
  );
}

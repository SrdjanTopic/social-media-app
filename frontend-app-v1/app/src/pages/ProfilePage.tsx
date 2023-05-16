import Profile from "../components/pageComponents/Profile/Profile";
import { useParams } from "react-router-dom";
import useGetByUsername from "../hooks/user/useGetByUsername";
import NonExistingUserPage from "./fallbackPages/NonExistingUserPage";

type CurrentUserProps = {
  currentUser: User | null;
};

export default function ProfilePage({ currentUser }: CurrentUserProps) {
  const username = useParams();
  const user = useGetByUsername(username.username);

  return user ? (
    <Profile currentUser={currentUser} user={user} />
  ) : (
    <NonExistingUserPage username={username.username} />
  );
}

import { useParams } from "react-router-dom";
import Profile from "../components/pageComponents/Profile/Profile";
import useGetByUsername from "../hooks/user/useGetByUsername";
import NonExistingUserPage from "./fallbackPages/NonExistingUserPage";
import LoadingSpinner from "../components/shared/LoadingSpinner/LoadingSpinner";

export default function ProfilePage() {
  const username = useParams();
  const user = useGetByUsername(username.username);
  return typeof user !== "undefined" ? (
    user ? (
      <Profile user={user} />
    ) : (
      <NonExistingUserPage username={username.username} />
    )
  ) : (
    <LoadingSpinner />
  );
}

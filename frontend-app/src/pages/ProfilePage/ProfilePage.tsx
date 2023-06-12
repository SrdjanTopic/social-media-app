import { useParams } from "react-router-dom";
import Profile from "../../components/pageComponents/Profile/Profile";
import NonExistingUserPage from "../fallbackPages/NonExistingUserPage";
import LoadingSpinner from "../../components/shared/LoadingSpinner/LoadingSpinner";
import useGetById from "../../hooks/user/useGetById";

export default function ProfilePage() {
  const userId = useParams();
  const [user, setUser] = useGetById(
    parseInt(userId.userId ? userId.userId : "0")
  );
  return typeof user !== "undefined" ? (
    user ? (
      <Profile user={user} setUser={setUser} />
    ) : (
      <NonExistingUserPage />
    )
  ) : (
    <LoadingSpinner />
  );
}

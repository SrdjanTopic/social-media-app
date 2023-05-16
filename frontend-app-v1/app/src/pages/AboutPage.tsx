import About from "../components/pageComponents/About/About";
import { useUsers } from "../components/pageComponents/Profile/Profile";

export default function AboutPage() {
  const users = useUsers();
  return <About user={users.user}></About>;
}

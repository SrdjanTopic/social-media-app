import { useOutletContext } from "react-router-dom";
import About from "../../../components/pageComponents/Profile/About/About";

export default function AboutTab() {
  const user = useOutletContext<{ user: User }>().user;
  return <About user={user} />;
}

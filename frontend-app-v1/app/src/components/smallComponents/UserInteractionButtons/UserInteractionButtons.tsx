import useCheckAreFriends from "../../../hooks/friend/useCheckAreFriends";
import useCheckAmRequested from "../../../hooks/friendRequest/useCheckAmRequested";
import useCheckAmRequesting from "../../../hooks/friendRequest/useCheckAmRequesting";
import styles from "./UserInteractionButtons.module.css";

type UserInteractionButtonsProps = {
  userId: number;
};

export default function UserInteractionButtons({
  userId,
}: UserInteractionButtonsProps) {
  const [amRequesting, setAmRequesing] = useCheckAmRequesting(userId);
  const [amRequested, setAmRequesed] = useCheckAmRequested(userId);
  const [areFriends, setAreFriends] = useCheckAreFriends(userId);

  <div className={styles.btnWrapper}></div>;
}

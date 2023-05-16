import UserCard from "../../smallComponents/UserCard/UserCard";
import styles from "./Friends.module.css";

type FriendsProps = {
  friends: User[];
  userAction: (userId: number, action: string) => void;
};

export default function Friends({ friends, userAction }: FriendsProps) {
  return (
    <>
      <h1 style={{ marginBottom: "1rem" }}>Friends</h1>
      <div className={styles.wrapper}>
        {friends.map((friend) => (
          <UserCard user={friend} key={friend.id} userAction={userAction} />
        ))}
      </div>
    </>
  );
}

import UserCard from "../../smallComponents/UserCard/UserCard";
import styles from "./UsersFriends.module.css";

type UsersFriendsProps = {
  friends: User[];
  currentUser: User | null;
  userAction: (userId: number, action: string) => void;
};

export default function UsersFriends({
  friends,
  currentUser,
  userAction,
}: UsersFriendsProps) {
  return (
    <>
      <h1 style={{ marginBottom: "1rem" }}>Friends</h1>
      <div className={styles.wrapper}>
        {friends.map((friend) => {
          if (currentUser?.username != friend.username)
            return (
              <UserCard user={friend} key={friend.id} userAction={userAction} />
            );
        })}
      </div>
    </>
  );
}

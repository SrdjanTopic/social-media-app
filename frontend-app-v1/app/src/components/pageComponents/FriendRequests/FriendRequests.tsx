import UserCard from "../../smallComponents/UserCard/UserCard";
import styles from "./FriendRequests.module.css";

type FriendRequestsProps = {
  requests: User[];
  requestAction: (userId: number, action: string) => void;
};

export default function FriendRequests({
  requests,
  requestAction,
}: FriendRequestsProps) {
  return (
    <>
      <h1 style={{ marginBottom: "1rem" }}>Friend Requests</h1>
      <div className={styles.wrapper}>
        {requests.map((request) => (
          <UserCard
            user={request}
            key={request.id}
            userAction={requestAction}
          />
        ))}
      </div>
    </>
  );
}

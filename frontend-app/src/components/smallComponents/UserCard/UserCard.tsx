import { Link } from "react-router-dom";
import useGetUserPicture from "../../../hooks/img/useGetUserPicture";
import styles from "./UserCard.module.css";
import friendService from "../../../services/friendService";
import friendRequestService from "../../../services/friendRequestService";

type UserCardProps = {
  user: User;
  setUser: (user: User) => void;
};

export default function UserCard({ user, setUser }: UserCardProps) {
  const profilePic = useGetUserPicture(user.id);

  function userAction(userId: number, userAction: UserActions) {
    switch (userAction.action) {
      case "unfriend": {
        friendService
          .unfriendUser(userId)
          .then((res) => {
            if (res !== 0) setUser({ ...user, isFriend: false });
          })
          .catch((err) => console.log(err));
        break;
      }
      case "cancelRequest": {
        friendRequestService
          .deleteRequest(userId)
          .then((res) => {
            if (res !== 0) setUser({ ...user, amRequesting: false });
          })
          .catch((err) => console.log(err));
        break;
      }
      case "acceptRequest": {
        friendRequestService
          .acceptRequest(userId)
          .then((res) => {
            if (res !== 0)
              setUser({ ...user, amRequested: false, isFriend: true });
          })
          .catch((err) => console.log(err));
        break;
      }
      case "rejectRequest": {
        friendRequestService
          .deleteRequest(userId)
          .then((res) => {
            if (res !== 0) setUser({ ...user, amRequested: false });
          })
          .catch((err) => console.log(err));
        break;
      }
      case "requestFriendship": {
        friendRequestService
          .sendFriendRequest(userId)
          .then((res) => {
            if (res !== 0) setUser({ ...user, amRequesting: true });
          })
          .catch((err) => console.log(err));
        break;
      }
    }
  }

  return (
    <>
      <div className={styles.userCard}>
        <img src={profilePic} alt="User Profile" />
        <div>
          <Link to={`/profile/${user.id}`}>{user.fullName}</Link>
          <h4>{user.username}</h4>
        </div>
        {user.isFriend !== undefined && (
          <div className={styles.userActionsWrapper}>
            {user.isFriend ? (
              <button
                onClick={() => userAction(user.id, { action: "unfriend" })}
              >
                Friends
              </button>
            ) : (
              <>
                {user.amRequesting && (
                  <button
                    onClick={() =>
                      userAction(user.id, { action: "cancelRequest" })
                    }
                  >
                    Requested
                  </button>
                )}
                {user.amRequested && (
                  <>
                    <button
                      onClick={() =>
                        userAction(user.id, { action: "acceptRequest" })
                      }
                    >
                      Accept Request
                    </button>
                    <button
                      onClick={() =>
                        userAction(user.id, { action: "rejectRequest" })
                      }
                    >
                      Reject Request
                    </button>
                  </>
                )}
                {!user.amRequesting && !user.amRequested && (
                  <button
                    onClick={() =>
                      userAction(user.id, { action: "requestFriendship" })
                    }
                  >
                    Send Request
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

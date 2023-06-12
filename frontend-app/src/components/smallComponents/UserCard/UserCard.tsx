import { Link } from "react-router-dom";
import useGetUserPicture from "../../../hooks/img/useGetUserPicture";
import styles from "./UserCard.module.css";
import { userActions } from "../../../utils/functions";

type UserCardProps = {
  user: User;
  setUser: (user: User) => void;
};

export default function UserCard({ user, setUser }: UserCardProps) {
  const profilePic = useGetUserPicture(user.id);

  function userAction(userId: number, userAction: UserActions) {
    userActions(userId, userAction).then((isDone) => {
      if (isDone) {
        switch (userAction.action) {
          case "unfriend": {
            setUser({ ...user, isFriend: false });
            break;
          }
          case "cancelRequest": {
            setUser({ ...user, amRequesting: false });
            break;
          }
          case "acceptRequest": {
            setUser({ ...user, amRequested: false, isFriend: true });
            break;
          }
          case "rejectRequest": {
            setUser({ ...user, amRequested: false });
            break;
          }
          case "requestFriendship": {
            setUser({ ...user, amRequesting: true });
            break;
          }
        }
      }
    });
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

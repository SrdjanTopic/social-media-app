import useGetUserPicture from "../../../hooks/img/useGetUserPicture";
import styles from "./UserCard.module.css";
import defaultPic from "../../../assets/defaultUserImg.jpg";
import useCheckAmRequesting from "../../../hooks/friendRequest/useCheckAmRequesting";
import useCheckAmRequested from "../../../hooks/friendRequest/useCheckAmRequested";
import useCheckAreFriends from "../../../hooks/friend/useCheckAreFriends";

type UserCardProps = {
  user: User;
  userAction: (userId: number, action: string) => void;
};

export default function UserCard({ user, userAction }: UserCardProps) {
  const profilePic = useGetUserPicture(user.id);
  const [amRequesting, setAmRequesting] = useCheckAmRequesting(user.id);
  const [amRequested, setAmRequested] = useCheckAmRequested(user.id);
  const [areFriends, setAreFriends] = useCheckAreFriends(user.id);
  return (
    <>
      <div className={styles.userCard}>
        <img src={profilePic ? profilePic : defaultPic} alt="User Profile" />
        <div>
          <a href={`/profile/${user.username}`}>{user.fullName}</a>
          <h4>({user.username})</h4>
        </div>

        <div className={styles.btnWrapper}>
          {areFriends ? (
            <button
              className={styles.unfriendBtn}
              type="button"
              onClick={() => {
                userAction(user.id, "unfriend");
                setAreFriends(false);
              }}
            >
              Unfriend
            </button>
          ) : (
            <>
              {amRequested ? (
                <>
                  <button
                    className={styles.accepRequestBtn}
                    type="button"
                    onClick={() => {
                      userAction(user.id, "accept");
                      setAreFriends(true);
                      setAmRequested(false);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className={styles.deleteRequestBtn}
                    type="button"
                    onClick={() => {
                      userAction(user.id, "delete");
                      setAmRequested(false);
                    }}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <button
                  className={styles.addFriendBtn}
                  onClick={() => {
                    userAction(user.id, "friendRequest");
                    setAmRequesting(true);
                  }}
                  disabled={amRequesting}
                >
                  {amRequesting ? "Requested" : "Add Friend"}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

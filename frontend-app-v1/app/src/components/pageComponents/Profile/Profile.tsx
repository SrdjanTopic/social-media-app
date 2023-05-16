import styles from "./Profile.module.css";
import defaultPic from "../../../assets/defaultUserImg.jpg";
import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";
import useGetUserPicture from "../../../hooks/img/useGetUserPicture";
import { ChangeEvent, useRef, useState } from "react";
import imageService from "../../../services/imageService";
import useGetAreFriends from "../../../hooks/friend/useCheckAreFriends";
import friendRequestService from "../../../services/friendRequestService";
import useCheckAmRequesting from "../../../hooks/friendRequest/useCheckAmRequesting";
import useCheckAmRequested from "../../../hooks/friendRequest/useCheckAmRequested";
import myProfileService from "../../../services/myProfileService";

type ProfileProps = {
  user: User;
  currentUser: User | null;
};

type ContextProps = {
  user: User;
  currentUser: User | null;
  isMyFriend: boolean;
};

export default function Profile({ user, currentUser }: ProfileProps) {
  const [loadedPicture, setLoadedPicture] = useState<string | null>(null);
  const picture = useGetUserPicture(user.id);
  const clickedTab =
    useLocation().pathname.split("/")[
      useLocation().pathname.split("/").length - 1
    ];
  const [isMyFriend, setIsMyFriend] = useGetAreFriends(user.id);
  const [amRequesting, setAmRequesting] = useCheckAmRequesting(user.id);
  const [amRequested, setAmRequested] = useCheckAmRequested(user.id);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);

  const pwModalRef = useRef<HTMLDialogElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  function handlePicUpload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = function () {
        setLoadedPicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleCancelImageUpload() {
    setLoadedPicture(null);
  }

  function handleSaveImageUpload() {
    imageService.saveUserProfilePicture(loadedPicture);
  }

  function sendFriendRequest() {
    friendRequestService
      .sendFriendRequest(user.id)
      .then((res) => {
        console.log(res);
        setAmRequesting(true);
      })
      .catch((err) => console.log(err));
  }

  function requestAction(userId: number, action: string) {
    if (action == "accept")
      friendRequestService
        .acceptRequest(userId)
        .then(() => {
          setAmRequested(false);
          setIsMyFriend(true);
        })
        .catch((err) => console.log(err));
    if (action == "delete")
      friendRequestService
        .deleteRequest(userId)
        .then(() => {
          setAmRequested(false);
          setIsMyFriend(false);
        })
        .catch((err) => console.log(err));
  }

  function handleEditProfile() {
    if (usernameRef.current && fullNameRef.current)
      if (
        usernameRef.current.value == user.username &&
        fullNameRef.current.value == user.fullName
      )
        return;
      else
        myProfileService
          .updateProfile({
            fullName: fullNameRef.current.value,
            username: usernameRef.current.value,
          })
          .then((res) => {
            window.location.replace(
              `http://127.0.0.1:5173/profile/${res.username}`
            );
            setIsEditing(false);
          })
          .catch((err) => console.log(err));
  }

  function handleChangePassword() {
    if (newPasswordRef.current) {
      myProfileService
        .changePassword({
          newPassword: newPasswordRef.current.value,
        })
        .then(() => {
          alert("Password changed successfully!");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainInfoSection}>
        <div className={styles.imgWrapper}>
          {currentUser?.username === user.username && (
            <>
              <label htmlFor="picture">
                <svg
                  height="2.5rem"
                  viewBox="0 0 24 24"
                  width="2.5rem"
                  fill="lightblue"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z" />
                </svg>
                <span className={styles.tootip}>Upload image</span>
              </label>
              <input
                type="file"
                name="picture"
                id="picture"
                onChange={handlePicUpload}
              />
            </>
          )}
          <img
            src={loadedPicture ? loadedPicture : picture ? picture : defaultPic}
            alt="User Profile"
          />
          {loadedPicture && (
            <div className={styles.checkMarks}>
              <div className={styles.svgDiv}>
                <svg
                  height="2rem"
                  viewBox="0 0 100 100"
                  width="2rem"
                  stroke="lightgreen"
                  strokeWidth="10"
                  fill="none"
                  className={styles.checkMark}
                  onClick={handleSaveImageUpload}
                >
                  <polyline points="20,55 45,80 85,30" />
                </svg>
                <span className={styles.tootip}>Save</span>
              </div>

              <div className={styles.svgDiv}>
                <svg
                  height="2rem"
                  viewBox="0 0 100 100"
                  width="2rem"
                  stroke="pink"
                  strokeWidth="10"
                  fill="none"
                  className={styles.checkMark}
                  onClick={handleCancelImageUpload}
                >
                  <polyline points="25,25 75,75" />
                  <polyline points="25,75 75,25" />
                </svg>
                <span className={styles.tootip}>Cancel</span>
              </div>
            </div>
          )}
        </div>
        <div className={styles.namesWrap}>
          <div>
            {isEditing ? (
              <input
                placeholder="Username"
                defaultValue={user.username}
                ref={usernameRef}
              />
            ) : (
              <h1>{user.username}</h1>
            )}
          </div>
          <div>
            {isEditing ? (
              <input
                placeholder="Full Name"
                defaultValue={user.fullName}
                ref={fullNameRef}
              />
            ) : (
              <h2>{user.fullName}</h2>
            )}
          </div>
        </div>
        {!isMyFriend && (
          <>
            {(amRequesting || (!amRequesting && !amRequested)) && (
              <button
                className={styles.addFriendBtn}
                onClick={sendFriendRequest}
                disabled={amRequesting}
              >
                {amRequesting ? "Requested" : "Add Friend"}
              </button>
            )}
            {amRequested && !amRequesting && (
              <div className={styles.btnWrapper}>
                <button
                  type="button"
                  onClick={() => requestAction(user.id, "accept")}
                >
                  Accept request
                </button>
                <button
                  type="button"
                  onClick={() => requestAction(user.id, "delete")}
                >
                  Delete request
                </button>
              </div>
            )}
          </>
        )}
        {currentUser?.username == user.username && !isEditing && (
          <div>
            <button
              className={styles.editProfileBtn}
              onClick={() => setIsEditing(true)}
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                height="2.5rem"
                width="2.5rem"
              >
                <g
                  stroke="lightblue"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="m11 3h-6c-1.10457 0-2 .89543-2 2v14c0 1.1046.89543 2 2 2h14c1.1046 0 2-.8954 2-2v-6" />
                  <path d="m9.5 11.5 8-8c.8284-.82843 2.1716-.82843 3 0s.8284 2.17157 0 3l-8 8-4.5 1.5z" />
                </g>
              </svg>
              <span className={styles.tootip}>Edit profile</span>
            </button>
            <button
              className={styles.editProfileBtn}
              onClick={() => pwModalRef.current?.showModal()}
            >
              <svg
                viewBox="0 0 390 511.815"
                fill="lightblue"
                height="2.5rem"
                width="2.5rem"
              >
                <path d="M24.983 197.869h16.918v-39.203c0-43.387 17.107-82.959 44.667-111.698C114.365 18 152.726 0 194.998 0c42.259 0 80.652 17.981 108.41 46.968 27.58 28.739 44.692 68.292 44.692 111.698v39.203h16.917c13.738 0 24.983 11.245 24.983 24.984v263.978c0 13.739-11.245 24.984-24.983 24.984H24.983C11.226 511.815 0 500.57 0 486.831V222.853c-.013-13.739 11.226-24.984 24.983-24.984zm149.509 173.905l-26.968 70.594h94.923l-24.966-71.573c15.852-8.15 26.688-24.67 26.688-43.719 0-27.169-22.015-49.169-49.184-49.169-27.153 0-49.153 22-49.153 49.169-.016 19.826 11.737 36.905 28.66 44.698zM89.187 197.869h211.602v-39.203c0-30.858-12.024-58.823-31.376-79.005-19.147-19.964-45.49-32.368-74.428-32.368-28.925 0-55.288 12.404-74.422 32.368-19.37 20.182-31.376 48.147-31.376 79.005v39.203z" />
              </svg>
              <span className={styles.tootip}>Change password</span>
            </button>
            <dialog ref={pwModalRef} className={styles.changePwModal}>
              <label htmlFor="newPW">
                Input new password
                <br />
                <input type="password" id="newPW" ref={newPasswordRef} />
              </label>
              <div>
                <button
                  type="button"
                  onClick={() => pwModalRef.current?.close()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleChangePassword();
                  }}
                >
                  Confirm
                </button>
              </div>
            </dialog>
          </div>
        )}
        {isEditing && (
          <div className={styles.editCheckMarks}>
            <div className={styles.svgDiv}>
              <svg
                height="2rem"
                viewBox="0 0 100 100"
                width="2rem"
                stroke="lightgreen"
                strokeWidth="10"
                fill="none"
                className={styles.checkMark}
                onClick={() => {
                  handleEditProfile();
                }}
              >
                <polyline points="20,55 45,80 85,30" />
              </svg>
              <span className={styles.tootip}>Save</span>
            </div>

            <div className={styles.svgDiv}>
              <svg
                height="2rem"
                viewBox="0 0 100 100"
                width="2rem"
                stroke="pink"
                strokeWidth="10"
                fill="none"
                className={styles.checkMark}
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                <polyline points="25,25 75,75" />
                <polyline points="25,75 75,25" />
              </svg>
              <span className={styles.tootip}>Cancel</span>
            </div>
          </div>
        )}
      </div>
      <div className={styles.tabs}>
        {isMyFriend && (
          <>
            <Link
              className={`${styles.tab} ${
                clickedTab == "posts" ? styles.clickedTab : ""
              }`}
              to={"posts"}
            >
              Posts
            </Link>
            <Link
              className={`${styles.tab} ${
                clickedTab == "friend" ? styles.clickedTab : ""
              }`}
              to={"friends"}
            >
              Friends
            </Link>
          </>
        )}
        {user.username == currentUser?.username && (
          <>
            <Link
              className={`${styles.tab} ${
                clickedTab == "liked" ? styles.clickedTab : ""
              }`}
              to={"liked"}
            >
              Liked
            </Link>
            <Link
              className={`${styles.tab} ${
                clickedTab == "disliked" ? styles.clickedTab : ""
              }`}
              to={"disliked"}
            >
              Disliked
            </Link>
          </>
        )}
      </div>
      <Outlet context={{ user, currentUser, isMyFriend }} />
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUsers() {
  return useOutletContext<ContextProps>();
}

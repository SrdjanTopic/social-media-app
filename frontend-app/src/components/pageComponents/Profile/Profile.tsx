import { ChangeEvent, useRef, useState, useEffect } from "react";
import useGetUserPicture from "../../../hooks/img/useGetUserPicture";
import styles from "./Profile.module.css";
import imageService from "../../../services/imageService";
import myProfileService from "../../../services/myProfileService";
import { getUserUpdateInfo, userActions } from "../../../utils/functions";
import { Outlet } from "react-router-dom";
import UserProfileTabs from "../../smallComponents/UserProfileTabs/UserProfileTabs";

type ProfileProps = {
  user: User;
  setUser: (user: User) => void;
};

export default function Profile({ user, setUser }: ProfileProps) {
  const [loadedPicture, setLoadedPicture] = useState<string | null>(null);
  const picture = useGetUserPicture(user.id);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);

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

  function handleEditProfile() {
    if (usernameRef.current && fullNameRef.current) {
      const userInfo: UpdateUser = {
        fullName: user.fullName,
        username: user.username,
      };
      const updateInfo: UpdateUser = {
        fullName: fullNameRef.current.value,
        username: usernameRef.current.value,
      };
      const userUpdateInfo = getUserUpdateInfo(userInfo, updateInfo);
      if (userUpdateInfo === null) {
        setIsEditing(false);
        return;
      } else
        myProfileService
          .updateProfile(userUpdateInfo)
          .then((res) => {
            setUser({
              ...user,
              fullName: res.fullName ? res.fullName : user.fullName,
              username: res.username ? res.username : user.username,
            });
            setIsEditing(false);
          })
          .catch((err) => console.log(err));
    }
  }

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
    <div className={styles.wrapper}>
      <div className={styles.mainInfoWrapper}>
        <div className={styles.imgWrapper}>
          {user.isFriend == undefined && (
            <>
              <label htmlFor="picture">
                <svg
                  height="2rem"
                  width="2rem"
                  viewBox="0 0 24 24"
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
            src={loadedPicture ? loadedPicture : picture}
            alt="User Profile"
          />
          {loadedPicture && (
            <div className={styles.checkMarks}>
              <div className={styles.svgDiv}>
                <svg
                  height="2rem"
                  width="2rem"
                  viewBox="0 0 100 100"
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
                  width="2rem"
                  viewBox="0 0 100 100"
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
        <div className={styles.namesWrapper}>
          <input
            id="username"
            placeholder="Username"
            defaultValue={user.username}
            ref={usernameRef}
            disabled={!isEditing}
            key={user.id}
          />
          <br />
          <input
            id="fullName"
            placeholder="Full name"
            defaultValue={user.fullName}
            ref={fullNameRef}
            disabled={!isEditing}
            key={user.id + 1}
          />
          {user.isFriend == undefined && (
            <>
              <div className={styles.editUserInfoBtnWrapper}>
                {!isEditing && (
                  <button
                    className={styles.editUserInfoBtn}
                    onClick={() => setIsEditing(true)}
                  >
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      height="2rem"
                      width="2rem"
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
                )}
              </div>
              {isEditing && (
                <div className={styles.editBtns}>
                  <button
                    type="button"
                    onClick={() => {
                      handleEditProfile();
                    }}
                  >
                    Save
                  </button>
                  <button type="button" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </div>
              )}
            </>
          )}
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
      <UserProfileTabs user={user} />
      <Outlet context={{ user: user }} />
    </div>
  );
}

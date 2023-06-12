import { Link, useLocation } from "react-router-dom";
import styles from "./UserProfileTabs.module.css";
import { useContext } from "react";
import { UserContext } from "../../../App";

type UserProfileTabsProps = {
  user: User;
};

export default function UserProfileTabs({ user }: UserProfileTabsProps) {
  const clickedTab =
    useLocation().pathname.split("/")[
      useLocation().pathname.split("/").length - 1
    ];
  const currentUser = useContext(UserContext);
  return (
    <div className={styles.tabs}>
      <Link
        className={`${styles.tab} ${
          clickedTab == "about" ? styles.clickedTab : ""
        }`}
        to={"about"}
      >
        About
      </Link>
      <Link
        className={`${styles.tab} ${
          clickedTab == "friends" ? styles.clickedTab : ""
        }`}
        to={"friends"}
      >
        Friends
      </Link>
      <Link
        className={`${styles.tab} ${
          clickedTab == "posts" && user.isFriend !== false
            ? styles.clickedTab
            : ""
        }`}
        to={"posts"}
        tabIndex={user.isFriend === false ? -1 : undefined}
      >
        Posts
      </Link>
      <Link
        className={`${styles.tab} ${
          clickedTab == "liked" && user.isFriend !== false
            ? styles.clickedTab
            : ""
        }`}
        to={"liked"}
        tabIndex={user.isFriend === false ? -1 : undefined}
      >
        Liked
      </Link>
      <Link
        className={`${styles.tab} ${
          clickedTab == "disliked" && user.isFriend !== false
            ? styles.clickedTab
            : ""
        }`}
        to={"disliked"}
        tabIndex={user.isFriend === false ? -1 : undefined}
      >
        Disliked
      </Link>
      {user.isFriend === false && <div className={styles.lockTabs}></div>}
    </div>
  );
}

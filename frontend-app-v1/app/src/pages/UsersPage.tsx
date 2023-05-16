import Users from "../components/pageComponents/Users/Users";
import useGetUsers from "../hooks/user/useGetUsers";
import friendRequestService from "../services/friendRequestService";

export default function UsersPage() {
  const [users, setUsers, filterAllUsers] = useGetUsers(null, null);

  function userAction(userId: number, action: string) {
    if (action == "friendRequest") {
      friendRequestService
        .sendFriendRequest(userId)
        .catch((err) => console.log(err));
    }
    if (action == "accept")
      friendRequestService
        .acceptRequest(userId)
        .then(() => setUsers(users.filter((user) => user.id != userId)))
        .catch((err) => console.log(err));
    if (action == "delete")
      friendRequestService
        .deleteRequest(userId)
        .catch((err) => console.log(err));
  }

  function filterUsers(username: string, fullName: string) {
    filterAllUsers(
      username == "" ? null : username,
      fullName == "" ? null : fullName
    );
  }
  return (
    <Users users={users} userAction={userAction} filterUsers={filterUsers} />
  );
}

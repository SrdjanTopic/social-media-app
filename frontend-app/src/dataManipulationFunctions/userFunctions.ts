import friendRequestService from "../services/friendRequestService";
import friendService from "../services/friendService";

export function getUserUpdateInfo(user: UpdateUser, updateInfo: UpdateUser) {
  if (
    updateInfo.username == user.username &&
    updateInfo.fullName == user.fullName
  ) {
    return null;
  } else
    return {
      fullName: updateInfo.fullName,
      username:
        updateInfo.username == user.username ? undefined : updateInfo.username,
    };
}

export async function userActions(
  userId: number,
  userAction: UserActions
): Promise<boolean> {
  let isDone = false;
  switch (userAction.action) {
    //
    //HANDLING REMOVE FRIEND ACTION
    //
    case "unfriend": {
      try {
        const res = await friendService.unfriendUser(userId);
        isDone = res !== 0;
      } catch (error) {
        throw new Error("Error");
      }
      break;
    }
    //
    //HANDLING DELETE FRIEND REQUEST ACTION
    //
    case "cancelRequest": {
      try {
        const res = await friendRequestService.deleteRequest(userId);
        isDone = res !== 0;
      } catch (error) {
        throw new Error("Error");
      }
      break;
    }
    //
    //HANDLING ACCEPT FRIEND REQUEST ACTION
    //
    case "acceptRequest": {
      try {
        const res = await friendRequestService.acceptRequest(userId);
        isDone = res !== 0;
      } catch (error) {
        throw new Error("Error");
      }
      break;
    }
    //
    //HANDLING REJECT FRIEND REQUEST ACTION
    //
    case "rejectRequest": {
      try {
        const res = await friendRequestService.deleteRequest(userId);
        isDone = res !== 0;
      } catch (error) {
        throw new Error("Error");
      }
      break;
    }
    //
    //HANDLING REQUEST FRIENDSHIP ACTION
    //
    case "requestFriendship": {
      try {
        const res = await friendRequestService.sendFriendRequest(userId);
        isDone = res !== 0;
      } catch (error) {
        throw new Error("Error");
      }
      break;
    }
  }
  return isDone;
}

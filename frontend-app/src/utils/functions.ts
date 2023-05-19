export function getDateDiffString(date2: Date, date1: Date) {
  const yearDiff = date2.getFullYear() - date1?.getFullYear();
  const monthDiff = date2.getMonth() - date1?.getMonth();
  const dayDiff = date2.getDate() - date1?.getDate();
  const hourDiff = date2.getHours() - date1?.getHours();
  const minDiff = date2.getMinutes() - date1?.getMinutes();

  if (yearDiff > 0) {
    if (monthDiff > 0)
      return `${yearDiff} year${yearDiff == 1 ? "" : "s"}, ${monthDiff} month${
        monthDiff == 1 ? "" : "s"
      } ago`;
    if (monthDiff == 0)
      return `${yearDiff} year${yearDiff == 1 ? "" : "s"} ago`;
    if (monthDiff < 0 && yearDiff - 1 == 0)
      return `${monthDiff} month${monthDiff == 1 ? "" : "s"} ago`;
    else
      return `${yearDiff - 1} year${
        yearDiff - 1 == 1 ? "" : "s"
      }, ${monthDiff} month${monthDiff == 1 ? "" : "s"} ago`;
  }
  if (monthDiff > 0)
    return `${monthDiff} month${monthDiff == 1 ? "" : "s"} ago`;
  if (dayDiff > 0) return `${dayDiff} day${dayDiff == 1 ? "" : "s"} ago`;
  if (hourDiff > 0) {
    if (hourDiff == 1 && minDiff < 0)
      return `${minDiff + 60} minute${minDiff + 60 == 1 ? "" : "s"} ago`;
    else return `${hourDiff} hour${hourDiff == 1 ? "" : "s"} ago`;
  }
  if (minDiff > 0) return `${minDiff} minute${minDiff == 1 ? "" : "s"} ago`;
  else return `now`;
}

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

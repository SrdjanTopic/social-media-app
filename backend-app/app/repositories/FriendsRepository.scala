package repositories

import com.google.inject.Inject
import db.Connection.db
import dto.user.UserDTO
import repositories.tables.SlickTables
import slick.jdbc.GetResult
import slick.jdbc.MySQLProfile.api._

import javax.inject.Singleton
import scala.concurrent.ExecutionContext

@Singleton
class FriendsRepository @Inject()()(implicit ec: ExecutionContext) {
  def searchAllUsersByFullName(myId: Long, fullName: String) = {
    implicit val getResults: GetResult[UserDTO] =
      GetResult(pr => UserDTO(pr.<<, pr.<<, pr.<<))
    val query = sql"""SELECT DISTINCT id, username, fullName FROM (
                     |	SELECT id, username, fullName, IFNULL(user1Id, 0) AS user1Id, IFNULL(user2Id, 0) AS user2Id
                     |	FROM users
                     |	LEFT OUTER JOIN friends ON id=user1Id
                     |	UNION
                     |	SELECT id, username, fullName, IFNULL(user1Id, 0) AS user1Id, IFNULL(user2Id, 0) AS user2Id
                     |	FROM users
                     |	LEFT OUTER JOIN friends ON id=user2Id) AS tbl WHERE username NOT IN (
                     |		SELECT username FROM (
                     |	SELECT id, username, fullName, IFNULL(user1Id, 0) AS user1Id, IFNULL(user2Id, 0) AS user2Id
                     |	FROM users
                     |	LEFT OUTER JOIN friends ON id=user1Id
                     |	UNION
                     |	SELECT id, username, fullName, IFNULL(user1Id, 0) AS user1Id, IFNULL(user2Id, 0) AS user2Id
                     |	FROM users
                     |	LEFT OUTER JOIN friends ON id=user2Id
                     |    ) AS tbl
                     |    WHERE user1Id=$myId
                     |    OR user2Id=$myId
                     |    OR id=$myId
                     |)AND LOWER(fullName) LIKE ($fullName);""".stripMargin.as[UserDTO]
    db.run(query)
  }

  def searchAllUsersByUsername(myId: Long, username: String) = {
    implicit val getResults: GetResult[UserDTO] =
      GetResult(pr => UserDTO(pr.<<, pr.<<, pr.<<))
    val query = sql"""SELECT DISTINCT id, username, fullName FROM (
                     |	SELECT id, username, fullName, IFNULL(user1Id, 0) AS user1Id, IFNULL(user2Id, 0) AS user2Id
                     |	FROM users
                     |	LEFT OUTER JOIN friends ON id=user1Id
                     |	UNION
                     |	SELECT id, username, fullName, IFNULL(user1Id, 0) AS user1Id, IFNULL(user2Id, 0) AS user2Id
                     |	FROM users
                     |	LEFT OUTER JOIN friends ON id=user2Id) AS tbl WHERE username NOT IN (
                     |		SELECT username FROM (
                     |	SELECT id, username, fullName, IFNULL(user1Id, 0) AS user1Id, IFNULL(user2Id, 0) AS user2Id
                     |	FROM users
                     |	LEFT OUTER JOIN friends ON id=user1Id
                     |	UNION
                     |	SELECT id, username, fullName, IFNULL(user1Id, 0) AS user1Id, IFNULL(user2Id, 0) AS user2Id
                     |	FROM users
                     |	LEFT OUTER JOIN friends ON id=user2Id
                     |    ) AS tbl
                     |    WHERE user1Id=$myId
                     |    OR user2Id=$myId
                     |    OR id=$myId
                     |)AND LOWER(username) LIKE $username;""".stripMargin.as[UserDTO]
    db.run(query)
  }

  def searchAllUsersByUsernameOrFullName(myId: Long, username: String, fullName: String) = {
    implicit val getResults: GetResult[UserDTO] =
      GetResult(pr => UserDTO(pr.<<, pr.<<, pr.<<))
    val query = sql"""SELECT DISTINCT id, username, fullName FROM (
                     |	SELECT id, username, fullName, IFNULL(user1Id, 0) AS user1Id, IFNULL(user2Id, 0) AS user2Id
                     |	FROM users
                     |	LEFT OUTER JOIN friends ON id=user1Id
                     |	UNION
                     |	SELECT id, username, fullName, IFNULL(user1Id, 0) AS user1Id, IFNULL(user2Id, 0) AS user2Id
                     |	FROM users
                     |	LEFT OUTER JOIN friends ON id=user2Id) AS tbl WHERE username NOT IN (
                     |		SELECT username FROM (
                     |	SELECT id, username, fullName, IFNULL(user1Id, 0) AS user1Id, IFNULL(user2Id, 0) AS user2Id
                     |	FROM users
                     |	LEFT OUTER JOIN friends ON id=user1Id
                     |	UNION
                     |	SELECT id, username, fullName, IFNULL(user1Id, 0) AS user1Id, IFNULL(user2Id, 0) AS user2Id
                     |	FROM users
                     |	LEFT OUTER JOIN friends ON id=user2Id
                     |    ) AS tbl
                     |    WHERE user1Id=$myId
                     |    OR user2Id=$myId
                     |    OR id=$myId
                     |)
                     |AND(LOWER(username) LIKE $username OR LOWER(fullName) LIKE $fullName);""".stripMargin.as[UserDTO]
    db.run(query)
  }

  def getAllUsersThatAreNotFriends(myId: Long) = {
    implicit val getResults: GetResult[UserDTO] =
      GetResult(pr => UserDTO(pr.<<, pr.<<, pr.<<))
    val query = sql"""SELECT DISTINCT id, username, fullName FROM (
                     |	SELECT id, username, fullName, IFNULL(user1Id, 0) AS user1Id, IFNULL(user2Id, 0) AS user2Id
                     |	FROM users
                     |	LEFT OUTER JOIN friends ON id=user1Id
                     |	UNION
                     |	SELECT id, username, fullName, IFNULL(user1Id, 0) AS user1Id, IFNULL(user2Id, 0) AS user2Id
                     |	FROM users
                     |	LEFT OUTER JOIN friends ON id=user2Id) AS tbl WHERE username NOT IN (
                     |		SELECT username FROM (
                     |	SELECT id, username, fullName, IFNULL(user1Id, 0) AS user1Id, IFNULL(user2Id, 0) AS user2Id
                     |	FROM users
                     |	LEFT OUTER JOIN friends ON id=user1Id
                     |	UNION
                     |	SELECT id, username, fullName, IFNULL(user1Id, 0) AS user1Id, IFNULL(user2Id, 0) AS user2Id
                     |	FROM users
                     |	LEFT OUTER JOIN friends ON id=user2Id
                     |    ) AS tbl WHERE user1Id=$myId OR user2Id=$myId OR id=$myId
                     |);""".stripMargin.as[UserDTO]
    db.run(query)
  }

  def getFriendsForUser(userId: Long) = {
    implicit val getResults: GetResult[UserDTO] =
      GetResult(pr => UserDTO(pr.<<, pr.<<, pr.<<))
    val query = sql"""select id, username, fullName from (
                     |	select id, username, fullName, IFNULL(user1Id, 0) as user1Id, IFNULL(user2Id, 0) as user2Id
                     |	FROM users
                     |	LEFT OUTER JOIN friends ON id=user1Id
                     |	UNION
                     |	select id, username, fullName, IFNULL(user1Id, 0) as user1Id, IFNULL(user2Id, 0) as user2Id
                     |	FROM users
                     |	LEFT OUTER JOIN friends ON id=user2Id
                     |) AS tbl
                     |WHERE ((user1Id=$userId AND user2Id<>$userId)
                     |OR (user2Id=$userId AND user1Id<>$userId))
                     |AND id<>$userId;""".stripMargin.as[UserDTO]
    db.run(query)
  }

  def unfriendUser(friendId: Long, myId: Long) = {
    db.run(SlickTables.friendsTable.filter(row => (row.user1Id === friendId && row.user2Id === myId) || (row.user2Id === friendId && row.user1Id === myId)).delete)
  }

  def areFriends(friendId: Long, myId: Long) = {
    db.run(SlickTables.friendsTable.filter(row => (row.user1Id === friendId && row.user2Id === myId) || (row.user2Id === friendId && row.user1Id === myId)).exists.result)
  }
}

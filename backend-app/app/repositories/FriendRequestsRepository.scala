package repositories
import com.google.inject.Inject
import db.Connection.db
import dto.user.UserDTO
import models.{FriendRequest, Friends}
import repositories.tables.SlickTables
import slick.jdbc.GetResult

import scala.concurrent.{ExecutionContext, Future}
import slick.jdbc.MySQLProfile.api._

import javax.inject.Singleton

@Singleton
class FriendRequestsRepository @Inject()()(implicit ec: ExecutionContext){
  def getFriendRequestCount(addresseeId:Long) = {
    db.run(SlickTables.friendRequestTable.filter(_.addresseeId===addresseeId).length.result)
  }

  def exists(addresseeId:Long, requesterId:Long): Future[Boolean] = {
    db.run(SlickTables.friendRequestTable.filter(row=>row.requesterId===requesterId&&row.addresseeId===addresseeId).exists.result)
  }

  def getFriendRequestsForUser(userId: Long) = {
    implicit val getResults: GetResult[UserDTO] =
      GetResult(pr => UserDTO(pr.<<, pr.<<, pr.<<))
    val query = sql"""SELECT id, username, fullName
                     |FROM users
                     |INNER JOIN friendRequests
                     |ON users.id = requesterId
                     |WHERE addresseeId=${userId};""".stripMargin.as[UserDTO]
    db.run(query)
  }

  def createFriendRequest(requestInfo: FriendRequest) = {
    db.run(SlickTables.friendRequestTable += requestInfo)
  }

  def acceptFriendRequest(requestInfo: FriendRequest) = {
    db.run(SlickTables.friendsTable += Friends(requestInfo.requesterId, requestInfo.addresseeId)).map(res => res)
  }

  def deleteFriendRequest(requestInfo: FriendRequest) = {
    db.run(SlickTables.friendRequestTable
      .filter(request => (request.requesterId === requestInfo.requesterId && request.addresseeId === requestInfo.addresseeId)
        ||
        (request.requesterId === requestInfo.addresseeId && request.addresseeId === requestInfo.requesterId))
      .delete)
  }
}

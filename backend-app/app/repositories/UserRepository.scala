package repositories

import com.google.inject.Inject
import db.Connection.db
import dto.user.UpdateUserInfoDTO
import models.User
import repositories.tables.SlickTables
import slick.jdbc.MySQLProfile.api._

import javax.inject.Singleton
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class UserRepository @Inject()()(implicit ec: ExecutionContext){
  def existsById(userId:Long): Future[Boolean] ={
    db.run(SlickTables.userTable.filter(_.id===userId).exists.result)
  }

  def existsByUsername(username: String): Future[Boolean] = {
    db.run(SlickTables.userTable.filter(_.username === username).exists.result)
  }

  def getAll: Future[Seq[User]] = {
    db.run(SlickTables.userTable.result)
  }

  def findByUsername(username: String): Future[Option[User]] = {
    db.run(SlickTables.userTable.filter(_.username===username).take(1).result.headOption)
  }

  def findById(userId: Long) = {
    db.run(SlickTables.userTable.filter(_.id===userId).take(1).result.headOption)
  }

  def createUser(userInfo: User): Future[User] = {
    val query = (SlickTables.userTable returning SlickTables.userTable.map(_.id)
      into { (userInfo,id)=>userInfo.copy(id=id) } += userInfo)
    db.run(query)
  }

  def updateUserInfo(userId:Long, userInfo: UpdateUserInfoDTO): Future[Int] = {
    val query = SlickTables.userTable
      .filter(_.id===userId)
      userInfo.username match {
        case Some(username) =>
          userInfo.fullName match {
            case Some(fullName) => db.run(query.map(user => (user.username, user.fullName)).update(username, fullName))
            case None => db.run(query.map(_.username).update(username))
          }
        case None =>
          userInfo.fullName match {
            case Some(fullName) => db.run(query.map(_.fullName).update(fullName))
            case None => Future.successful(0)
        }
      }
  }

  def changePassword(userId:Long, password: String): Future[Int] = {
    val query = SlickTables.userTable.filter(_.id === userId).map(user=>user.password).update(password)
    db.run(query)
  }
}

package repositories

import com.google.inject.Inject
import db.Connection.db
import dto.comment.{CommentWithUserDTO, UpdateCommentDTO}
import models.CommentOnPost
import repositories.tables.SlickTables

import javax.inject.Singleton
import scala.concurrent.{ExecutionContext, Future}
import slick.jdbc.MySQLProfile.api._

import java.sql.Timestamp

@Singleton
class CommentRepository @Inject()()(implicit ec: ExecutionContext){
  def getById(commentId:Long): Future[Option[CommentOnPost]] = {
    db.run(SlickTables.commentTable.filter(_.id===commentId).take(1).result.headOption)
  }

  def getAllForPost(postId: Long): Future[Seq[CommentOnPost]] = {
    db.run(SlickTables.commentTable.filter(_.postId === postId).result)
  }

  def getAllForPostWithUser(postId:Long): Future[Seq[(Long, String, Long, Timestamp, Long, String, String)]] = {
    val innerJoin = for {
      (c, u) <- SlickTables.commentTable.filter(_.postId===postId) join SlickTables.userTable on (_.userId === _.id)
    } yield (c.id, c.text, c.userId, c.creationDate, c.postId, u.fullName, u.username)
    db.run(innerJoin.sortBy(_._4.desc ).result)
  }

  def createComment(commentInfo: CommentOnPost): Future[(Long, String, Long, Timestamp, Long, String, String)] = {
    val query = (SlickTables.commentTable returning SlickTables.commentTable.map(_.id)
      into { (commentInfo, id) => commentInfo.copy(id = id) } += commentInfo)
    db.run(query).flatMap(comment=>{
      val innerJoin = for {
        (c, u) <- SlickTables.commentTable.filter(_.id === comment.id) join SlickTables.userTable on (_.userId === _.id)
      } yield (c.id, c.text, c.userId, c.creationDate, c.postId, u.fullName, u.username)
      db.run(innerJoin.result.head)
    })
  }

  def updateComment(commentInfo: UpdateCommentDTO): Future[Int] = {
    val query = SlickTables.commentTable.filter(_.id === commentInfo.id).map(comment => comment.text).update(commentInfo.text)
    db.run(query)
  }

  def deleteComment(commentId: Long, userId: Long): Future[Int] = {
    val query = SlickTables.commentTable.filter(comment => comment.id === commentId && comment.userId === userId).delete
    db.run(query)
  }
}

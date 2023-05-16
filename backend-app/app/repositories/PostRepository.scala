package repositories

import com.google.inject.Inject
import db.Connection.db
import dto.post.{PostWithUserDTO, UpdatePostDTO}
import models.Post
import repositories.tables.SlickTables
import slick.jdbc.GetResult

import scala.concurrent.{ExecutionContext, Future}
import slick.jdbc.MySQLProfile.api._

import javax.inject.Singleton
@Singleton
class PostRepository @Inject()()(implicit ec: ExecutionContext){
  def isMyPost(postId:Long, userId:Long): Future[Boolean] = {
    db.run(SlickTables.postTable.filter(post => post.id === postId && post.userId === userId).exists.result)
  }

  def existsById(postId: Long): Future[Boolean] = {
    db.run(SlickTables.postTable.filter(_.id === postId).exists.result)
  }

  def getAllFromFriends(userId:Long) = {
    implicit val getResults: GetResult[PostWithUserDTO] =
      GetResult(pr => PostWithUserDTO(pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<))
    val query = sql"""select posts.id, text, creationDate, likeCount, dislikeCount, username, fullName
                     |from posts inner join users on userId=users.id
                     |where userId in (
                     |	select REPLACE(CONCAT(user1Id, user2Id), ${userId}, '') as 'friendId' from friends
                     |)
                     |order by creationDate desc;""".stripMargin.as[PostWithUserDTO]
    db.run(query)
  }

  def getAllForUser(userId:Long): Future[Seq[Post]] = {
    db.run(SlickTables.postTable.filter(_.userId===userId).sortBy(_.creationDate.desc).result)
  }

  def getById(postId:Long): Future[Option[Post]] = {
    db.run(SlickTables.postTable.filter(_.id===postId).take(1).result.headOption)
  }

  def createPost(postInfo: Post): Future[Post] = {
    val query = (SlickTables.postTable returning SlickTables.postTable.map(_.id)
      into { (postInfo,id)=>postInfo.copy(id=id) } += postInfo)
    db.run(query)
  }

  def updatePost(postInfo: UpdatePostDTO): Future[Int] = {
    val query = SlickTables.postTable.filter(_.id===postInfo.id).map(post=> post.text).update(postInfo.text)
    db.run(query)
  }

  def deletePost(postId:Long, userId:Long): Future[Int] = {
    val query = SlickTables.postTable.filter(post=>post.id===postId && post.userId===userId).delete
    db.run(query)
  }

  def incrementLikeCounter(postId:Long)={
    val query = sql"""UPDATE posts
                     |SET likeCount = likeCount + 1
                     |WHERE posts.id=${postId};""".stripMargin.as[Long]
    db.run(query)
  }

  def incrementDislikeCounter(postId: Long) = {
    val query = sql"""UPDATE posts
                     |SET dislikeCount = dislikeCount + 1
                     |WHERE posts.id=${postId};""".stripMargin.as[Long]
    db.run(query)
  }

  def decrementLikeCounter(postId: Long) = {
    val query = sql"""UPDATE posts
                     |SET likeCount = likeCount - 1
                     |WHERE posts.id=${postId};""".stripMargin.as[Long]
    db.run(query)
  }

  def decrementDislikeCounter(postId: Long) = {
    val query = sql"""UPDATE posts
                     |SET dislikeCount = dislikeCount - 1
                     |WHERE posts.id=${postId};""".stripMargin.as[Long]
    db.run(query)
  }

  def changeLikeToDislike(postId: Long) = {
    val query = sql"""UPDATE posts
                     |SET likeCount = likeCount - 1, dislikeCount = dislikeCount + 1
                     |WHERE posts.id=${postId};""".stripMargin.as[Long]
    db.run(query)
  }

  def changeDislikeToLike(postId: Long) = {
    val query = sql"""UPDATE posts
                     |SET dislikeCount = dislikeCount - 1, likeCount = likeCount + 1
                     |WHERE posts.id=${postId};""".stripMargin.as[Long]
    db.run(query)
  }
}
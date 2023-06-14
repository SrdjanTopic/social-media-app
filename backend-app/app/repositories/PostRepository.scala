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
  def existsById(postId: Long): Future[Boolean] = {
    db.run(SlickTables.postTable.filter(_.id === postId).exists.result)
  }

  def getAllFromFriends(userId:Long) = {
    implicit val getResults: GetResult[PostWithUserDTO] =
      GetResult(pr => PostWithUserDTO(pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<))
    val query = sql"""select table2.postId, table2.text, table2.creationDate, table2.likeCount, table2.dislikeCount, table2.userId, table2.username, table2.fullName, table3.isLiked
                     |from
                     |    (select table1.id as postId, table1.text, table1.creationDate, table1.likeCount, table1.dislikeCount, table1.userId, table1.username, table1.fullName
                     |    from
                     |		(select posts.id, text, creationDate, likeCount, dislikeCount, userId, username, fullName
                     |		from posts inner join users on posts.userId=users.id
                     |		where posts.userId in
                     |			(select REPLACE(CONCAT(user1Id, user2Id), $userId, '') as 'friendId' from friends)) as table1,
                     |	users
                     |	where users.id=$userId) as table2
                     |left outer join
                     |	(select * from postRatings where userId=$userId) as table3
                     |on table2.postId=table3.postId order by creationDate desc;""".stripMargin.as[PostWithUserDTO]
    db.run(query)
  }

  def getAllForUser(userId:Long, myId:Long): Future[Vector[PostWithUserDTO]] = {
    implicit val getResults: GetResult[PostWithUserDTO] =
      GetResult(pr => PostWithUserDTO(pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<))
    val query = sql"""select posts.id, text, creationDate, likeCount, dislikeCount, posts.userId, username, fullName, table1.isLiked
                     |from posts left outer join (select * from postRatings where postRatings.userId=$myId) as table1
                     |    on posts.id = table1.postId inner join users on users.id = posts.userId
                     |where posts.userId=$userId
                     |order by creationDate desc;""".stripMargin.as[PostWithUserDTO]
    db.run(query)
  }

  def getLikedByUser(userId:Long, myId:Long) = {
    implicit val getResults: GetResult[PostWithUserDTO] =
      GetResult(pr => PostWithUserDTO(pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<))
    val query = sql"""select id, text, creationDate, likeCount, dislikeCount, table1.userId, username, fullName, table2.isLiked
                     |from
                     |	(select p1.id, p1.text, p1.creationDate, p1.likeCount, p1.dislikeCount, p1.userId, u1.username, u1.fullName
                     |	from postRatings pr
                     |	inner join posts p1 on pr.postId=p1.id
                     |	inner join users u1 on u1.id=p1.userId
                     |	where pr.userId=$userId and pr.isLiked=true) as table1
                     |left outer join
                     |	(select * from postRatings where postRatings.userId=$myId) as table2 on table1.id=table2.postId
                     |order by creationDate desc;""".stripMargin.as[PostWithUserDTO]
    db.run(query)
  }

  def getDislikedByUser(userId: Long, myId: Long) = {
    implicit val getResults: GetResult[PostWithUserDTO] =
      GetResult(pr => PostWithUserDTO(pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<))
    val query = sql"""select id, text, creationDate, likeCount, dislikeCount, table1.userId, username, fullName, table2.isLiked
                     |from
                     |	(select p1.id, p1.text, p1.creationDate, p1.likeCount, p1.dislikeCount, p1.userId, u1.username, u1.fullName
                     |	from postRatings pr
                     |	inner join posts p1 on pr.postId=p1.id
                     |	inner join users u1 on u1.id=p1.userId
                     |	where pr.userId=$userId and pr.isLiked=false) as table1
                     |left outer join
                     |	(select * from postRatings where postRatings.userId=$myId) as table2 on table1.id=table2.postId
                     |order by creationDate desc;""".stripMargin.as[PostWithUserDTO]
    db.run(query)
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

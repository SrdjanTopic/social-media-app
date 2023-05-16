package repositories

import com.google.inject.Inject
import db.Connection.db
import dto.postRating.RatedPostForUserDTO
import models.PostRating
import repositories.tables.SlickTables
import slick.jdbc.GetResult
import slick.jdbc.MySQLProfile.api._

import javax.inject.Singleton
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class PostRatingRepository @Inject()()(implicit ec: ExecutionContext){
  def getIsLikedByUser(postId:Long, userId: Long)= {
    val query = SlickTables.postRatingTable.filter(postRating => postRating.postId === postId && postRating.userId === userId).result.headOption
    db.run(query).map {
      case Some(rating) => Some(rating.isLiked)
      case _ => None
    }
  }

  def getAllForUser(userId: Long) = {
    implicit val getResults: GetResult[RatedPostForUserDTO] =
      GetResult(pr=>RatedPostForUserDTO(pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<, pr.<<))
    val query = sql"""SELECT postId, isLiked, text, posts.userId, creationDate, likeCount, dislikeCount
        |FROM posts
        |INNER JOIN postRatings
        |ON posts.id = postRatings.postId
        |WHERE postRatings.userId=${userId};""".stripMargin.as[RatedPostForUserDTO]
    db.run(query)
  }

  def addRating(postRatingInfo: PostRating): Future[PostRating] = {
    db.run(SlickTables.postRatingTable  += postRatingInfo).map(_=>postRatingInfo)
  }

  def updateRating(postRatingInfo: PostRating): Future[PostRating] = {
    db.run(SlickTables.postRatingTable
      .filter(postRating=>postRating.postId===postRatingInfo.postId && postRating.userId===postRatingInfo.userId)
      .update(postRatingInfo))
    Future.successful(postRatingInfo)
  }

  def deleteRating(postId: Long, userId:Long):Future[Option[PostRating]] = {
    db.run(SlickTables.postRatingTable
      .filter(postRating => postRating.postId === postId && postRating.userId === userId)
      .take(1).result.headOption).flatMap{
        case Some(existingRating) =>
          db.run(SlickTables.postRatingTable.filter(postRating => postRating.postId === postId && postRating.userId === userId).delete)
          Future.successful(Some(existingRating))
        case None => Future.successful(None)
    }
  }
}

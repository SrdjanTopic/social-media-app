package services

import com.google.inject.Inject
import models.PostRating
import repositories.{PostRatingRepository, PostRepository}

import javax.inject.Singleton
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class PostRatingService @Inject()(postRatingRepository: PostRatingRepository, postRepository:PostRepository , friendsService: FriendsService)(implicit ec: ExecutionContext){
  def getIsLikedByUser(postId:Long, userId:Long) = {
    postRatingRepository.getIsLikedByUser(postId, userId)
  }

  def getAllForUser(userId:Long)={
    postRatingRepository.getAllForUser(userId)
  }

  def addRating(postRatingInfo: PostRating) = {
    postRepository.getById(postRatingInfo.postId).flatMap {
      case Some(post) => friendsService.areFriends(post.userId, postRatingInfo.userId).flatMap{
        case true => postRatingRepository.addRating(postRatingInfo).map(postRating => {
          if (postRating.isLiked) {
            postRepository.incrementLikeCounter(postRating.postId)
          } else {
            postRepository.incrementDislikeCounter(postRating.postId)
          }
          Right(postRating)
        })
        case false => Future.successful(Left("You are not able to like/dislike a non-friends post!"))
      }
      case None => Future.successful(Left("Post does not exist!"))
    }
  }

  def updateRating(postRatingInfo: PostRating): Future[PostRating] = {
    postRatingRepository.updateRating(postRatingInfo).map(postRating => {
      if (postRating.isLiked)
        postRepository.changeDislikeToLike(postRating.postId)
      else
        postRepository.changeLikeToDislike(postRating.postId)
      postRating
    })
  }

  def deleteRating(postId: Long, userId: Long)= {
    postRatingRepository.deleteRating(postId, userId).flatMap {
      case Some(deletedRating) =>
        if (deletedRating.isLiked)
         postRepository.decrementLikeCounter(postId).map(_ =>  Right(deletedRating))
        else
          postRepository.decrementDislikeCounter(postId).map(_ =>  Right(deletedRating))

      case None => Future.successful(Left("Rating does not exist!"))
    }
  }
}

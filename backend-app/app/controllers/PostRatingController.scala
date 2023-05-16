package controllers

import actions.AuthenticatedAction
import com.google.inject.Inject
import dto.postRating.AddPostRatingDTO
import play.api.libs.json.Json
import play.api.mvc.{BaseController, ControllerComponents}
import services.PostRatingService
import formats.jsonFormats.{addPostRatingFormat, postRatingFormat, ratedPostForUserDTO}
import models.PostRating

import javax.inject.Singleton
import scala.concurrent.ExecutionContext

@Singleton
class PostRatingController @Inject()(postRatingService:PostRatingService, authenticatedAction: AuthenticatedAction)(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext) extends BaseController {
  def getIsLikedByUser(postId: Long) = authenticatedAction.async{request =>
    postRatingService.getIsLikedByUser(postId, request.userId.toLong).map{
      case Some(res) => Ok(Json.toJson(res))
      case _ => Ok(Json.toJson(None))
    }
  }

  def getAllForUser()= authenticatedAction.async(request => {
    val userId: Long = request.userId.toLong
    postRatingService.getAllForUser(userId).map(results=>Ok(Json.toJson(results)))
  })

  def addRating() = authenticatedAction.async(parse.json[AddPostRatingDTO])(request => {
    val userId: Long = request.userId.toLong
    val postRatingInfo: AddPostRatingDTO = request.body
    postRatingService.addRating(PostRating(postRatingInfo.postId,userId,postRatingInfo.isLiked)).map {
      case Left(errorMessage) => Conflict(Json.obj("message" -> errorMessage))
      case Right(addedPostRating) => Created(Json.toJson(addedPostRating))
    }
  })

  def updateRating() = authenticatedAction.async(parse.json[AddPostRatingDTO])(request => {
    val userId: Long = request.userId.toLong
    val postRatingInfo: AddPostRatingDTO = request.body
    postRatingService.updateRating(PostRating(postRatingInfo.postId, userId, postRatingInfo.isLiked)).map(addedPostRating => {
      Ok(Json.toJson(addedPostRating))
    })
  })

  def deleteRating(postId: Long) = authenticatedAction.async { implicit request =>
    postRatingService.deleteRating(postId, request.userId.toLong).map {
      case Left(errorMessage) => Conflict(Json.obj("message" -> errorMessage))
      case Right(res) => Ok(Json.toJson(res))
    }
  }
}

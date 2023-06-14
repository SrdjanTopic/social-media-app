package controllers

import actions.AuthenticatedAction
import com.google.inject.Inject
import dto.post.{CreatePostDTO, CreatePostFrontDTO, UpdatePostDTO}
import formats.jsonFormats.{createPostFrontFormat, postWithUserFormat, returnPostFormat}
import play.api.libs.json.Json
import play.api.mvc.{BaseController, ControllerComponents}
import services.PostService

import java.io.File
import javax.inject.Singleton
import scala.concurrent.ExecutionContext

@Singleton
class PostController @Inject()(postService:PostService, authenticatedAction: AuthenticatedAction)(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext) extends BaseController {
  def getAllForUser(userId:Long) = authenticatedAction.async{ request=>
    postService.getAllForUser(userId, request.userId.toLong).map{
      case Left(errorMessage) => Conflict(Json.obj("message" -> errorMessage))
      case Right(posts) => Ok(Json.toJson(posts))
    }
  }

  def getAllFromFriends() = authenticatedAction.async { request =>
    val userId: Long = request.userId.toLong
    postService.getAllFromFriends(userId).map {
      case Left(errorMessage) => Conflict(Json.obj("message" -> errorMessage))
      case Right(posts) => Ok(Json.toJson(posts))
    }
  }

  def getLikedByUser(userId: Long) = authenticatedAction.async { request =>
    postService.getLikedByUser(userId, request.userId.toLong).map {
      case Left(errorMessage) => Conflict(Json.obj("message" -> errorMessage))
      case Right(posts) => Ok(Json.toJson(posts))
    }
  }

  def getDislikedByUser(userId: Long) = authenticatedAction.async { request =>
    postService.getDislikedByUser(userId, request.userId.toLong).map {
      case Left(errorMessage) => Conflict(Json.obj("message" -> errorMessage))
      case Right(posts) => Ok(Json.toJson(posts))
    }
  }

  def createPost() = authenticatedAction(parse.json[CreatePostFrontDTO]).async{ implicit request =>
    val post: CreatePostFrontDTO = request.body
    postService.createPost(CreatePostDTO(post.text, request.userId.toLong)).map {
      case Left(errorMessage) => Conflict(Json.obj("message" -> errorMessage))
      case Right(createdPost) => Created(Json.toJson(createdPost))
    }
  }

  def updatePost(postId:Long) = authenticatedAction(parse.json[CreatePostFrontDTO]).async { implicit request =>
    val post: CreatePostFrontDTO = request.body
    postService.updatePost(UpdatePostDTO(postId,post.text, request.userId.toLong)).map(res => {
      Created(Json.toJson(res))
    })
  }

  def deletePost(postId:Long) = authenticatedAction.async { implicit request =>
    postService.deletePost(postId, request.userId.toLong).map(deletedPost => {
      if(deletedPost != 0) {
        val file = new File(s"C:\\Users\\Srdjan Topic\\Desktop\\praksa-scala\\praksa-srdjan-topic-backend\\images\\postPictures\\$postId.png")
        file.delete
        Ok(Json.toJson(deletedPost))
      }
      else Conflict(Json.obj("message" -> "unsuccessful deletion"))
    })
  }
}

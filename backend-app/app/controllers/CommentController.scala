package controllers

import actions.AuthenticatedAction
import com.google.inject.Inject
import dto.comment.{CreateCommentDTO, CreateCommentFrontDTO, UpdateCommentDTO}
import play.api.libs.json.Json
import play.api.mvc.{BaseController, ControllerComponents}
import services.CommentService
import formats.jsonFormats.{createCommentFronFormat, returnCommentFormat, returnCommentWithUserFormat}

import javax.inject.Singleton
import scala.concurrent.ExecutionContext

@Singleton
class CommentController @Inject()(commentService: CommentService, authenticatedAction: AuthenticatedAction)(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext) extends BaseController {
  def checkIfMyComment(commentId:Long) = authenticatedAction.async{ request=>
    commentService.checkIfMyComment(commentId, request.userId.toLong).map{
      case Right(res) => Ok(Json.toJson(res))
      case Left(errorMessage) => Conflict(Json.obj("message" -> errorMessage))
    }
  }

  def getAllForPost(postId:Long) = authenticatedAction.async {
    commentService.getAllForPostWithUser(postId).map {
      case Left(errorMessage) => Conflict(Json.obj("message" -> errorMessage))
      case Right(comments) => Ok(Json.toJson(comments))
    }
  }

  def createComment() = authenticatedAction(parse.json[CreateCommentFrontDTO]).async { implicit request =>
    val comment: CreateCommentFrontDTO = request.body
    commentService.createComment(CreateCommentDTO(comment.text, request.userId.toLong, comment.postId)).map {
      case Left(errorMessage) => Conflict(Json.obj("message" -> errorMessage))
      case Right(createdPost) => Created(Json.toJson(createdPost))
    }
  }

  def updateComment(commentId: Long) = authenticatedAction(parse.json[CreateCommentFrontDTO]).async { implicit request =>
    val comment: CreateCommentFrontDTO = request.body
    commentService.updateComment(UpdateCommentDTO(commentId, comment.text, request.userId.toLong, comment.postId)).map(res => {
      Created(Json.toJson(res))
    })
  }

  def deleteComment(commentId: Long) = authenticatedAction.async { implicit request =>
    commentService.deleteComment(commentId, request.userId.toLong).map(deletedPost => {
      Ok(Json.toJson(deletedPost))
    })
  }
}

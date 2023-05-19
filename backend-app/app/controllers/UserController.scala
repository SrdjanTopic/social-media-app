package controllers

import actions.AuthenticatedAction
import com.google.inject.Inject
import dto.user.{ChangePasswordDTO, CreateUserDTO, UpdateUserInfoDTO}
import formats.jsonFormats.{changePasswordDTOFormat, createUserDTOFormat, updateUserInfoDTOFormat, userDTOFormat}
import play.api.libs.json.{JsError, Json}
import play.api.mvc._
import services.UserService

import javax.inject.Singleton
import scala.concurrent.{ExecutionContext, Future}
@Singleton
class UserController @Inject()(userService:UserService, authenticatedAction: AuthenticatedAction)(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext) extends BaseController {

  def findById(userId: Long) = authenticatedAction.async { request =>
    userService.findById(userId, request.userId.toLong).map {
      case Some(u) => Ok(Json.toJson(u))
      case None => NotFound(s"User with the id ${userId} does not exist")
    }
  }

  def findByUsername(username: String) = authenticatedAction.async { request =>
    userService.findByUsername(username, request.userId.toLong).map {
      case Some(u) => Ok(Json.toJson(u))
      case None => NotFound(s"User with the username ${username} does not exist")
    }
  }

  def myProfile() = authenticatedAction.async { request =>
    userService.findById(request.userId.toLong, request.userId.toLong).map {
      case Some(u) => Ok(Json.toJson(u))
      case None => Conflict("Error occurred")
    }
  }

  def createUser() = Action.async(parse.json)(request => {
      val userData = request.body.validate[CreateUserDTO]
      userData.fold(
        errors => {
          Future.successful(BadRequest(Json.obj("message" -> JsError.toJson(errors))))
        },
        person => userService.createUser(person).map {
          case Left(errorMessage) => Conflict(Json.obj("message" -> errorMessage))
          case Right(createdUser) => Created(Json.toJson(createdUser))
        }
      )
  })

  def updateUserInfo() = authenticatedAction.async(parse.json)(request => {
    val userData = request.body.validate[UpdateUserInfoDTO]
    val userId = request.userId.toLong
    userData.fold(
      errors => {
        Future.successful(BadRequest(Json.obj("message" -> JsError.toJson(errors))))
      },
      user => userService.updateUserInfo(userId, UpdateUserInfoDTO(user.username, user.fullName)).map {
        case Left(errorMessage) => Conflict(Json.obj("message" -> errorMessage))
        case Right(createdUser) => Created(Json.toJson(createdUser))
      }
    )
  })

  def changePassword() = authenticatedAction.async(parse.json)(request => {
    val passwords = request.body.validate[ChangePasswordDTO]
    val userId = request.userId.toLong

    passwords.fold(
      errors => {
        Future.successful(BadRequest(Json.obj("message" -> JsError.toJson(errors))))
      },
      pw => userService.changePassword(userId, pw).map {
        case Left(errorMessage) => Conflict(Json.obj("message" -> errorMessage))
        case Right(res) => Created(Json.toJson(res))
      }
    )
  })
}

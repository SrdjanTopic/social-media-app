package controllers

import actions.AuthenticatedAction
import auth.AuthService
import com.google.inject.Inject
import dto.user.UserLoginDTO

import javax.inject.Singleton
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class AuthController @Inject()(authService:AuthService, authenticatedAction: AuthenticatedAction, val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext) extends BaseController {

  implicit val userLoginFormat = Json.format[UserLoginDTO]

  def isAuthenticated() = authenticatedAction.async{
    Future.successful(Ok(Json.toJson(true)))
  }

  def login() = Action.async(parse.json[UserLoginDTO](userLoginFormat))(request => {
      val loginData: UserLoginDTO = request.body
      authService.getLoginToken(loginData).map {
        case Some(token) => Ok(Json.toJson(token))
        case None => Unauthorized("Incorrect username or password")
      }
    })
}

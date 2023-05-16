package actions

import auth.jwTokenInfo
import com.google.inject.Inject
import io.jsonwebtoken.Jwts
import play.api.mvc._

import java.util.Date
import javax.inject.Singleton
import scala.concurrent.{ExecutionContext, Future}
import scala.util.matching.Regex

@Singleton
class AuthenticatedAction @Inject()(val controllerComponents: ControllerComponents)(implicit val executionContext: ExecutionContext)
  extends ActionBuilder[AuthenticatedRequest, AnyContent]
    with Results {

  override def parser: BodyParser[AnyContent] = controllerComponents.parsers.defaultBodyParser
  override def invokeBlock[A](request: Request[A], block: AuthenticatedRequest[A] => Future[Result]): Future[Result] = {
    request.headers.get(jwTokenInfo.HEADER) match {
      case Some(header) =>
        val keyValPattern: Regex = "(Bearer) (.+\\..+\\..+)".r
        keyValPattern.findFirstMatchIn(header) match {
          case Some(matched) =>
            try {
              val claims = Jwts.parser()
                .setSigningKey(jwTokenInfo.SECRET)
                .parseClaimsJws(matched.group(2)).getBody
              val authenticatedRequest = AuthenticatedRequest(claims.getId, claims.getSubject, request)
              block(authenticatedRequest)
            }
            catch {
              case _: Exception => Future.successful(Unauthorized("Invalid or expired token!"))
            }
          case _ => Future.successful(Unauthorized("No match for token regex!"))
        }
      case _ => Future.successful(Unauthorized("No jwt in header"))
    }
  }
}
case class AuthenticatedRequest[A](userId: String, username:String, request: Request[A]) extends WrappedRequest(request)
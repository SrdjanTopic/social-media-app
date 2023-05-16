package auth

import com.google.inject.Inject
import dto.user.UserLoginDTO
import io.jsonwebtoken.{Jwts, SignatureAlgorithm}
import models.User
import org.mindrot.jbcrypt.BCrypt
import services.UserService

import java.util.Date
import javax.inject.Singleton
import scala.concurrent.{ExecutionContext, Future}

object jwTokenInfo {
  val ISSUER: String = "social-media-app"
  val SECRET: String = "secretKey"
  val EXPIRESIN: Int = 1800000
  val HEADER: String = "Authorization"
  val AUDIENCE: String = "web"
  val SIGNATURE: SignatureAlgorithm = SignatureAlgorithm.HS512

}
@Singleton
class AuthService @Inject()(userService: UserService) (implicit ec: ExecutionContext){
  def generateJWT(user: User): String = {
    Jwts.builder()
      .setIssuer(jwTokenInfo.ISSUER)
      .setSubject(user.username)
      .setId(user.id.toString)
      .setAudience(jwTokenInfo.AUDIENCE)
      .setIssuedAt(new Date())
      .setExpiration(new Date(new Date().getTime + jwTokenInfo.EXPIRESIN))
      .signWith(jwTokenInfo.SIGNATURE, jwTokenInfo.SECRET)
      .compact()
  }

  def getLoginToken(loggingInUser: UserLoginDTO): Future[Option[String]] = {
    userService.findByUsernameForAuth(loggingInUser.username).map{
      case Some(user) =>
        if (BCrypt.checkpw(loggingInUser.password, user.password))
          Option(generateJWT(user))
        else None
      case None => None
    }

  }

}

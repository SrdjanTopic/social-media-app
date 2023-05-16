package services

import com.google.inject.Inject
import dto.user.{ChangePasswordDTO, CreateUserDTO, UpdateUserInfoDTO, UserDTO}
import models.User
import repositories.UserRepository

import javax.inject.Singleton
import scala.concurrent.{ExecutionContext, Future}
@Singleton
class UserService @Inject()(userRepository:UserRepository, passwordService: PasswordService)(implicit ec: ExecutionContext){

  def getAll: Future[Seq[UserDTO]] = {
    userRepository.getAll.map(users=> users.map(u=>UserDTO(u.id, u.username, u.fullName)))
  }

  def findById(userId: Long): Future[Option[UserDTO]] = {
    userRepository.findById(userId).map {
      case Some(user) => Option(UserDTO(user.id, user.username, user.fullName))
      case None => None
    }
  }

  def findByUsername(username: String): Future[Option[UserDTO]] = {
    userRepository.findByUsername(username).map {
      case Some(user) => Option(UserDTO(user.id, user.username, user.fullName))
      case None => None
    }
  }

  def findByUsernameForAuth(username: String): Future[Option[User]] = {
    userRepository.findByUsername(username)
  }

  def createUser(userInfo: CreateUserDTO)= {
    userRepository.existsByUsername(userInfo.username).flatMap {
      case false =>
        val newPWHash: String = passwordService.hashPassword(userInfo.password)
        userRepository.createUser(User(-1, userInfo.username, userInfo.fullName, newPWHash))
          .map(user => Right(UserDTO(user.id, user.username, user.fullName)))
      case true => Future.successful(Left(s"User with username: '${userInfo.username}' already exists!"))
    }
  }

  def updateUserInfo(userId:Long, userInfo: UpdateUserInfoDTO) = {
    userRepository.existsById(userId).flatMap {
      case true =>
        userRepository.existsByUsername(userInfo.username).flatMap {
          case false => userRepository.updateUserInfo(userId, userInfo).map(res => Right(userInfo))
          case true => Future.successful(Left(s"User with username: '${userInfo.username}' already exists!"))
        }
      case false => Future.successful(Left(s"User with ID:'${userId}' does not exist!"))
    }
  }

  def changePassword(userId:Long, passwords:ChangePasswordDTO)= {
    val newPWHash: String = passwordService.hashPassword(passwords.newPassword)
    userRepository.existsById(userId).flatMap {
      case true =>
          userRepository.changePassword(userId, newPWHash).map(res => Right(res))
      case false => Future.successful(Left(s"User with ID:'${userId}' does not exist!"))
    }
  }
}

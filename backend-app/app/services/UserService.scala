package services

import com.google.inject.Inject
import dto.user.{ChangePasswordDTO, CreateUserDTO, UpdateUserInfoDTO, UserDTO}
import models.User
import repositories.{FriendRequestsRepository, FriendsRepository, UserRepository}

import javax.inject.Singleton
import scala.concurrent.{ExecutionContext, Future}
@Singleton
class UserService @Inject()(userRepository:UserRepository, passwordService: PasswordService, friendsRepository: FriendsRepository, friendRequestsRepository: FriendRequestsRepository)(implicit ec: ExecutionContext){
  def fillIsFriendIsRequestingIsRequestedForGotUser(user:User, myId:Long) = {
    if (user.id == myId)
      Future.successful(UserDTO(user.id, user.username, user.fullName))
    else
      friendsRepository.areFriends(user.id, myId).flatMap {
        case true => Future.successful(UserDTO(user.id, user.username, user.fullName, None, None, Option(true)))
        case false =>
          friendRequestsRepository.exists(user.id, myId).flatMap(amRequesting =>
            friendRequestsRepository.exists(myId, user.id).map(amRequested =>
              UserDTO(user.id, user.username, user.fullName, Option(amRequesting), Option(amRequested), Option(false))
            )
          )
      }
  }

  def findById(userId: Long, myId:Long) = {
    userRepository.findById(userId).flatMap {
      case Some(user) =>
        fillIsFriendIsRequestingIsRequestedForGotUser(user, myId).map(user=>Option(user))
      case None => Future.successful(None)
    }
  }


  def findByUsername(username: String, myId:Long) = {
    userRepository.findByUsername(username).flatMap {
      case Some(user) =>
        fillIsFriendIsRequestingIsRequestedForGotUser(user, myId).map(user=>Option(user))
      case None => Future.successful(None)
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
        userInfo.username match {
          case Some(username) =>
            userRepository.existsByUsername(username).flatMap {
              case false => userRepository.updateUserInfo(userId, userInfo).map(_ => Right(userInfo))
              case true => Future.successful(Left(s"User with username: '${userInfo.username}' already exists!"))
          }
          case None => userRepository.updateUserInfo(userId, userInfo).map(_ => Right(userInfo))
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

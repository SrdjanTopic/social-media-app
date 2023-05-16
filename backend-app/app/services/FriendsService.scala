package services

import com.google.inject.Inject
import repositories.FriendsRepository

import javax.inject.Singleton
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class FriendsService @Inject()(friendsRepository: FriendsRepository)(implicit ec: ExecutionContext){
  def getAllUsersThatAreNotFriends(myId: Long, username: Option[String], fullName: Option[String]) = {
    username match {
      case Some(username) => fullName match {
        case Some(fullName) => friendsRepository.searchAllUsersByUsernameOrFullName(myId, s"%$username%", s"%$fullName%")
        case _ => friendsRepository.searchAllUsersByUsername(myId, s"%$username%")
      }
      case _=> fullName match {
        case Some(fullName) => friendsRepository.searchAllUsersByFullName(myId, s"%$fullName%")
        case _ => friendsRepository.getAllUsersThatAreNotFriends(myId)
      }
    }
  }

  def getFriendsForUser(userId: Long) = {
    friendsRepository.getFriendsForUser(userId)
  }

  def unfriendUser(friendId: Long, myId: Long) = {
    friendsRepository.unfriendUser(friendId, myId)
  }

  def areFriends(friendId: Long, myId: Long) = {
    if (friendId == myId) Future(true)
    else friendsRepository.areFriends(friendId, myId)
  }
}

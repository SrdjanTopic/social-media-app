package services
import com.google.inject.Inject
import models.FriendRequest
import repositories.{FriendRequestsRepository, UserRepository}

import javax.inject.Singleton
import scala.concurrent.{ExecutionContext, Future}
@Singleton
class FriendRequestsService @Inject()(friendRequestsRepository: FriendRequestsRepository, userRepository:UserRepository)(implicit ec: ExecutionContext) {
  def getFriendRequestCount(addresseeId: Long) = {
    friendRequestsRepository.getFriendRequestCount(addresseeId)
  }

  def checkIfIAmRequesting(addresseeId: Long, requesterId: Long) = {
    friendRequestsRepository.exists(addresseeId,requesterId)
  }

  def checkIfIAmRequested(addresseeId: Long, requesterId: Long) = {
    friendRequestsRepository.exists(requesterId, addresseeId)
  }

  def createFriendRequest(requesterId: Long, addresseeId: Long) = {
    if (requesterId == addresseeId)
      Future.successful(Left("Cannot send friend request to yourself!"))
    else {
      userRepository.existsById(addresseeId).flatMap {
        case true => friendRequestsRepository.createFriendRequest(FriendRequest(requesterId, addresseeId)).map(res => Right(res))
        case false => Future.successful(Left(s"User with ID:'${addresseeId}' does not exist!"))
      }
    }
  }

  def getFriendRequestsForUser(userId: Long) = {
    friendRequestsRepository.getFriendRequestsForUser(userId)
  }

  def acceptFriendRequest(requesterId: Long, addresseeId: Long): Future[Int] = {
    friendRequestsRepository.deleteFriendRequest(FriendRequest(requesterId, addresseeId)).flatMap {
      case 0 => Future.successful(0)
      case _ => friendRequestsRepository.acceptFriendRequest(FriendRequest(requesterId, addresseeId))
    }
  }

  def deleteFriendRequest(requesterId: Long, addresseeId: Long) = {
    friendRequestsRepository.deleteFriendRequest(FriendRequest(requesterId, addresseeId))
  }
}

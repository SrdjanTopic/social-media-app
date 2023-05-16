package services

import models.FriendRequest
import org.mockito.Mockito.when
import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AsyncWordSpec
import org.scalatestplus.mockito.MockitoSugar.mock
import repositories.{FriendRequestsRepository, UserRepository}

import scala.concurrent.Future

class FriendRequestServiceSpec  extends AsyncWordSpec with Matchers {
  "createFriendRequest" must {

    "return 1 that indicates the Friend Request has been created" in {
      val userRepoMock = mock[UserRepository]
      val friendRequestsRepoMock = mock[FriendRequestsRepository]
      val requesterId = 1
      val addresseeId = 2

      // mock user repo exists call
      when(userRepoMock.existsById(addresseeId))
        .thenReturn(Future.successful(true))

      // mock user repo create call
      when(friendRequestsRepoMock.createFriendRequest(FriendRequest(requesterId, addresseeId)))
        .thenReturn(Future.successful(1))

      // invoke and assert
      new FriendRequestsService(friendRequestsRepoMock, userRepoMock)
        .createFriendRequest(requesterId, addresseeId)
        .map {
          case Right(number) =>
            number mustBe 1
          case Left(msg) =>
            fail(msg)
        }
    }

    "return error message when a non-existing addresseeId is provided" in {
      val userRepoMock = mock[UserRepository]
      val friendRequestsRepoMock = mock[FriendRequestsRepository]
      val requesterId = 1
      val addresseeId = 2

      // mock user repo exists call
      when(userRepoMock.existsById(addresseeId))
        .thenReturn(Future.successful(false))

      // invoke and assert
      new FriendRequestsService(friendRequestsRepoMock, userRepoMock)
        .createFriendRequest(requesterId, addresseeId)
        .map {
          case Right(number) =>
            fail(number.toString)
          case Left(msg) =>
            msg mustBe s"User with ID:'$addresseeId' does not exist!"
        }
    }

    "return error message when requesterId==addresseeId" in {
      val userRepoMock = mock[UserRepository]
      val friendRequestsRepoMock = mock[FriendRequestsRepository]
      val requesterId = 1
      val addresseeId = 1

      // invoke and assert
      new FriendRequestsService(friendRequestsRepoMock, userRepoMock)
        .createFriendRequest(requesterId, addresseeId)
        .map {
          case Right(number) =>
            fail(number.toString)
          case Left(msg) =>
            msg mustBe "Cannot send friend request to yourself!"
        }
    }
  }
}

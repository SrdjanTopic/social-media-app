package services

import models.{Post, PostRating}
import org.mockito.Mockito.when
import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AsyncWordSpec
import org.scalatestplus.mockito.MockitoSugar.mock
import repositories.{PostRatingRepository, PostRepository}

import scala.concurrent.Future

class PostRatingServiceSpec extends AsyncWordSpec with Matchers {
  "addRating" must{
    "return the added post rating if rating was added successfully" in {
      val postRating: PostRating = PostRating(1, 3, true)
      val post: Post = Post(1, "some post text", 4)
      val postRatingRepoMock = mock[PostRatingRepository]
      val friendServiceMock = mock[FriendsService]
      val postRepoMock = mock[PostRepository]

      when(postRepoMock.getById(postRating.postId))
        .thenReturn(Future.successful(Some(post)))

      when(friendServiceMock.areFriends(post.userId, postRating.userId))
        .thenReturn(Future.successful(true))

      when(postRatingRepoMock.addRating(postRating))
        .thenReturn(Future.successful(postRating))

      new PostRatingService(postRatingRepoMock,postRepoMock, friendServiceMock)
        .addRating(postRating)
        .map{
          case Right(returnedPostRating) =>
            returnedPostRating.userId mustBe postRating.userId
            returnedPostRating.postId mustBe postRating.postId
            returnedPostRating.isLiked mustBe postRating.isLiked
          case Left(msg) =>
            fail(msg)
        }
    }

    "return error message if the post doesn't exist" in {
      val postRating: PostRating = PostRating(1, 3, true)
      val postRatingRepoMock = mock[PostRatingRepository]
      val friendServiceMock = mock[FriendsService]
      val postRepoMock = mock[PostRepository]

      when(postRepoMock.getById(postRating.postId))
        .thenReturn(Future.successful(None))

      new PostRatingService(postRatingRepoMock, postRepoMock, friendServiceMock)
        .addRating(postRating)
        .map {
          case Right(returnedPostRating) =>
            fail(returnedPostRating.toString)
          case Left(msg) =>
            msg mustBe "Post does not exist!"
        }
    }

    "return error message if the post users are not friends" in {
      val postRating: PostRating = PostRating(1, 3, true)
      val post: Post = Post(1, "some post text", 4)
      val postRatingRepoMock = mock[PostRatingRepository]
      val friendServiceMock = mock[FriendsService]
      val postRepoMock = mock[PostRepository]

      when(postRepoMock.getById(postRating.postId))
        .thenReturn(Future.successful(Some(post)))

      when(friendServiceMock.areFriends(post.userId, postRating.userId))
        .thenReturn(Future.successful(false))

      new PostRatingService(postRatingRepoMock, postRepoMock, friendServiceMock)
        .addRating(postRating)
        .map {
          case Right(returnedPostRating) =>
            fail(returnedPostRating.toString)
          case Left(msg) =>
            msg mustBe "You are not able to like/dislike a non-friends post!"
        }
    }
  }
}

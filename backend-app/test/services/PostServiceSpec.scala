package services

import dto.post.{CreatePostDTO, PostDTO}
import models.Post
import org.mockito.ArgumentMatchers.any
import org.mockito.Mockito.when
import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AsyncWordSpec
import org.scalatestplus.mockito.MockitoSugar.mock
import repositories.{PostRepository, UserRepository}

import scala.concurrent.Future

class PostServiceSpec extends AsyncWordSpec with Matchers {
  "createPost" must {

    "return created post if creation was successful" in {
      val createPostDto : CreatePostDTO = CreatePostDTO("some post text", 4)
      val userRepoMock = mock[UserRepository]
      val postRepoMock = mock[PostRepository]

      when(userRepoMock.existsById(createPostDto.userId))
        .thenReturn(Future.successful(true))

      val createdPost = Post(16, createPostDto.text, createPostDto.userId)
      when(postRepoMock.createPost(any[Post]))
        .thenReturn(Future.successful(createdPost))

      new PostService(postRepoMock, userRepoMock)
        .createPost(createPostDto)
        .map{
          case Right(createdPostDto) =>
            createdPostDto.id mustBe createdPost.id
            createdPostDto.text mustBe createdPost.text
            createdPostDto.userId mustBe createdPost.userId
          case Left(msg) =>
            fail(msg)
      }
    }

    "return error message if a non-existing userId is provided" in {
      val createPostDto: CreatePostDTO = CreatePostDTO("some post text", 1)
      val userRepoMock = mock[UserRepository]
      val postRepoMock = mock[PostRepository]

      when(userRepoMock.existsById(createPostDto.userId))
        .thenReturn(Future.successful(false))

      new PostService(postRepoMock, userRepoMock)
        .createPost(createPostDto)
        .map {
          case Right(createdPostDto) =>
            fail(createdPostDto.toString)
          case Left(msg) =>
            msg mustBe s"User with ID:'${createPostDto.userId}' does not exist!"
        }
    }
  }

  "getAllForUser" must {
    "return all users posts " in {
      val userRepoMock = mock[UserRepository]
      val postRepoMock = mock[PostRepository]
      val existingUserId = 3
      val posts = Seq(Post(1,"text1", existingUserId), Post(2,"text2", existingUserId))

      when(userRepoMock.existsById(existingUserId))
        .thenReturn(Future.successful(true))

      when(postRepoMock.getAllForUser(existingUserId))
        .thenReturn(Future.successful(posts))

      new PostService(postRepoMock, userRepoMock)
        .getAllForUser(existingUserId)
        .map{
          case Right(returnedPosts) =>
            val comparisonPosts = returnedPosts.map(post=>Post(post.id,post.text, post.userId, post.creationDate.get, post.likeCount, post.dislikeCount))
            comparisonPosts mustBe posts
          case Left(msg) =>
            fail(msg)
        }
    }

    "return error message if a non-existing userId is provided" in {
      val userRepoMock = mock[UserRepository]
      val postRepoMock = mock[PostRepository]
      val existingUserId = 1
      val posts = Seq(Post(1, "text1", existingUserId), Post(2, "text2", existingUserId))

      when(userRepoMock.existsById(existingUserId))
        .thenReturn(Future.successful(false))

      new PostService(postRepoMock, userRepoMock)
        .getAllForUser(existingUserId)
        .map {
          case Right(returnedPosts) =>
            fail(returnedPosts.toString)
          case Left(msg) =>
            msg mustBe s"User with ID:'${existingUserId}' does not exist!"
        }
    }
  }
}

package services

import dto.comment.{CommentWithUserDTO, CreateCommentDTO}
import org.mockito.Mockito.when
import org.scalatest.matchers.must.Matchers
import org.scalatest.wordspec.AsyncWordSpec
import org.scalatestplus.mockito.MockitoSugar.mock
import repositories.{CommentRepository, PostRepository}
import models.CommentOnPost
import org.mockito.ArgumentMatchers.any

import scala.concurrent.Future

class CommentServiceSpec extends AsyncWordSpec with Matchers {
  "create comment" must {
    "return the created comment with user info if the post exists" in {
      val createCommentInfo: CreateCommentDTO = CreateCommentDTO("Comment text", 1, 1)
      val commentWithUser: CommentWithUserDTO = CommentWithUserDTO(1, createCommentInfo.text, createCommentInfo.userId, createCommentInfo.creationDate, createCommentInfo.postId, "FullName", "username")
      val commentRepoMock = mock[CommentRepository]
      val postRepoMock = mock[PostRepository]

      when(postRepoMock.existsById(createCommentInfo.postId))
        .thenReturn(Future.successful(true))

      when(commentRepoMock.createComment(any[CommentOnPost]))
        .thenReturn(Future.successful((1, createCommentInfo.text, createCommentInfo.userId, createCommentInfo.creationDate, createCommentInfo.postId, "FullName", "username")))

      new CommentService(commentRepoMock, postRepoMock)
        .createComment(createCommentInfo).map{
        case Right(comment)  =>
          comment.text mustBe commentWithUser.text
          comment.postId mustBe commentWithUser.postId
          comment.userId mustBe commentWithUser.userId
        case Left(msg) =>
          fail(msg)
      }
    }

    "return error message if post doesn't exist" in {
      val createCommentInfo: CreateCommentDTO = CreateCommentDTO("Comment text", 1, 1)
      val commentRepoMock = mock[CommentRepository]
      val postRepoMock = mock[PostRepository]

      when(postRepoMock.existsById(createCommentInfo.postId))
        .thenReturn(Future.successful(false))

      new CommentService(commentRepoMock, postRepoMock)
        .createComment(createCommentInfo).map {
        case Right(comment) =>
          fail(comment.toString)
        case Left(msg) =>
          msg mustBe s"Post with ID:'${createCommentInfo.postId}' does not exist!"
      }
    }
  }
}

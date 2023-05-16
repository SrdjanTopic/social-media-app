package services

import com.google.inject.Inject
import dto.comment.{CommentDTO, CommentWithUserDTO, CreateCommentDTO, UpdateCommentDTO}
import repositories.{CommentRepository, PostRepository}
import models.CommentOnPost

import scala.concurrent.{ExecutionContext, Future}

class CommentService @Inject()(commentRepository: CommentRepository, postRepository:PostRepository)(implicit ec: ExecutionContext){
  def checkIfMyComment(commentId:Long, myId:Long): Future[Either[String, Boolean]] = {
    commentRepository.getById(commentId).map{
      case Some(comment) => if(comment.userId == myId) Right(true) else Right(false)
      case _ => Left(s"Comment with ${commentId} does not exist")
    }
  }

  def getAllForPost(postId: Long): Future[Either[String, Seq[CommentDTO]]] = {
    postRepository.existsById(postId).flatMap {
      case true => commentRepository.getAllForPost(postId)
        .map(comments => Right(comments
          .map(c => CommentDTO(c.id, c.text, c.userId, Option(c.creationDate), c.postId))))
      case false => Future.successful(Left(s"Post with ID:'${postId}' does not exist!"))
    }
  }

  def getAllForPostWithUser(postId:Long): Future[Either[String, Seq[CommentWithUserDTO]]] = {
    postRepository.existsById(postId).flatMap {
      case true => commentRepository.getAllForPostWithUser(postId)
        .map(comments => Right(comments
          .map(c => CommentWithUserDTO.apply _ tupled c)))
      case false => Future.successful(Left(s"Post with ID:'${postId}' does not exist!"))
    }
  }

  def createComment(commentInfo: CreateCommentDTO): Future[Either[String, CommentWithUserDTO]] = {
    postRepository.existsById(commentInfo.postId).flatMap {
      case true => commentRepository.createComment(CommentOnPost(-1, commentInfo.text, commentInfo.userId, commentInfo.postId))
        .map(c => Right(CommentWithUserDTO.apply _ tupled c))
      case false => Future.successful(Left(s"Post with ID:'${commentInfo.postId}' does not exist!"))
    }
  }

  def updateComment(commentInfo: UpdateCommentDTO): Future[Int] = {
    commentRepository.updateComment(commentInfo)
  }

  def deleteComment(commentId: Long, userId: Long): Future[Int] = {
    commentRepository.deleteComment(commentId, userId)
  }
}

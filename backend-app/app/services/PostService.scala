package services

import com.google.inject.Inject
import dto.post.{CreatePostDTO, PostDTO, PostWithUserDTO, UpdatePostDTO}
import models.Post
import repositories.{PostRepository, UserRepository}

import javax.inject.Singleton
import scala.concurrent.{ExecutionContext, Future}
@Singleton
class PostService @Inject()(postRepository:PostRepository, userRepository: UserRepository)(implicit ec: ExecutionContext){
  def getAllForUser(userId: Long, myId:Long): Future[Either[String, Seq[PostWithUserDTO]]] = {
    userRepository.existsById(userId).flatMap {
      case true => postRepository.getAllForUser(userId, myId).map(res=>Right(res))
      case false => Future.successful(Left(s"User with ID:'${userId}' does not exist!"))
    }
  }

  def getAllFromFriends(userId:Long): Future[Either[String, Vector[PostWithUserDTO]]] = {
    userRepository.existsById(userId).flatMap {
      case true => postRepository.getAllFromFriends(userId).map(res=>Right(res))
      case false => Future.successful(Left(s"User with ID:'${userId}' does not exist!"))
    }
  }

  def getLikedByUser(userId: Long, myId: Long): Future[Either[String, Seq[PostWithUserDTO]]] = {
    userRepository.existsById(userId).flatMap {
      case true => postRepository.getLikedByUser(userId, myId).map(res => Right(res))
      case false => Future.successful(Left(s"User with ID:'${userId}' does not exist!"))
    }
  }

  def getDislikedByUser(userId: Long, myId: Long): Future[Either[String, Seq[PostWithUserDTO]]] = {
    userRepository.existsById(userId).flatMap {
      case true => postRepository.getDislikedByUser(userId, myId).map(res => Right(res))
      case false => Future.successful(Left(s"User with ID:'${userId}' does not exist!"))
    }
  }

  def createPost(postInfo: CreatePostDTO): Future[Either[String, PostDTO]] = {
    userRepository.existsById(postInfo.userId).flatMap {
      case true => postRepository.createPost(Post(-1, postInfo.text, postInfo.userId)).map(createdPost => Right(PostDTO(
        createdPost.id, createdPost.text, createdPost.userId, Option(createdPost.creationDate), createdPost.likeCount, createdPost.dislikeCount)))
      case false => Future.successful(Left(s"User with ID:'${postInfo.userId}' does not exist!"))
    }
  }

  def updatePost(postInfo: UpdatePostDTO): Future[Int] = {
    postRepository.updatePost(postInfo)
  }

  def deletePost(postId: Long, userId: Long): Future[Int] = {
    postRepository.deletePost(postId, userId)
  }
}

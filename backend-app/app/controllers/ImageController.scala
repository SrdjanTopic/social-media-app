package controllers

import actions.AuthenticatedAction
import akka.stream.Materializer
import akka.stream.scaladsl.Source
import akka.util.ByteString
import com.google.inject.Inject
import dto.user.ImageDTO
import play.api.libs.json.Json
import play.api.mvc._

import java.nio.file.{Files, Paths}
import java.util.Base64
import javax.inject.Singleton
import scala.concurrent.{ExecutionContext, Future}

import formats.jsonFormats.imageFormat

case class ImageData(filename: String, bytes: Array[Byte])
object ImageData {
  implicit val format = Json.format[ImageData]
}
@Singleton
class ImageController @Inject()(authenticatedAction: AuthenticatedAction)(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext, mat: Materializer) extends BaseController {

  def getProfilePicture() = authenticatedAction.async {request=>
    val userId = request.userId.toLong
    val profilePicturePath = Paths.get(s"C:\\Users\\Srdjan Topic\\Desktop\\MY PROJECTS\\praksa-NovaLite\\social-media-app\\backend-app\\images\\profilePictures\\$userId.png")
    val profilePictureBytes = Files.readAllBytes(profilePicturePath)
    val imgStr = Base64.getEncoder.encodeToString(ByteString(profilePictureBytes).toArray)
      Future.successful(Ok.chunked(Source.fromIterator(() => imgStr.getBytes("UTF-8").grouped(1024)))
        .as("application/octet-stream"))
  }

  def getProfilePictureByUsername(userId:String) = authenticatedAction.async {
    val profilePicturePath = Paths.get(s"C:\\Users\\Srdjan Topic\\Desktop\\MY PROJECTS\\praksa-NovaLite\\social-media-app\\backend-app\\images\\profilePictures\\$userId.png")
    val profilePictureBytes = Files.readAllBytes(profilePicturePath)
    val imgStr = Base64.getEncoder.encodeToString(ByteString(profilePictureBytes).toArray)
    Future.successful(Ok.chunked(Source.fromIterator(() => imgStr.getBytes("UTF-8").grouped(1024)))
      .as("application/octet-stream"))
  }

  def uploadProfilePicture() = authenticatedAction.async(parse.json[ImageDTO]) { request =>
    val userId = request.userId.toLong
    val base64String:ImageDTO = request.body
    val decodedBytes = Base64.getDecoder.decode(base64String.image)
    val imageData = ImageData(s"${userId}.png", decodedBytes)
    val imagePath = Paths.get(s"C:\\Users\\Srdjan Topic\\Desktop\\MY PROJECTS\\praksa-NovaLite\\social-media-app\\backend-app\\images\\profilePictures\\${imageData.filename}")
    Files.write(imagePath, imageData.bytes)

    Future.successful(Ok("Image uploaded successfully"))
  }

  def getPostPicture(postId:Long) = authenticatedAction.async {
    val profilePicturePath = Paths.get(s"C:\\Users\\Srdjan Topic\\Desktop\\MY PROJECTS\\praksa-NovaLite\\social-media-app\\backend-app\\images\\postPictures\\$postId.png")
    val profilePictureBytes = Files.readAllBytes(profilePicturePath)
    val imgStr = Base64.getEncoder.encodeToString(ByteString(profilePictureBytes).toArray)
    Future.successful(Ok.chunked(Source.fromIterator(() => imgStr.getBytes("UTF-8").grouped(1024)))
      .as("application/octet-stream"))
  }

  def uploadPostPicture(postId:Long) = authenticatedAction.async(parse.json[ImageDTO]) { request =>
    val base64String = request.body
    val decodedBytes = Base64.getDecoder.decode(base64String.image)
    val imageData = ImageData(s"$postId.png", decodedBytes)
    val imagePath = Paths.get(s"C:\\Users\\Srdjan Topic\\Desktop\\MY PROJECTS\\praksa-NovaLite\\social-media-app\\backend-app\\images\\postPictures\\${imageData.filename}")
    Files.write(imagePath, imageData.bytes)

    Future.successful(Ok("Image uploaded successfully"))
  }
}

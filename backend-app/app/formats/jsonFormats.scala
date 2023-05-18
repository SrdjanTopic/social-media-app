package formats

import dto.comment.{CommentDTO, CommentWithUserDTO, CreateCommentDTO, CreateCommentFrontDTO}
import dto.friendRequest.CreateFriendRequestDTO
import dto.post.{CreatePostDTO, CreatePostFrontDTO, PostDTO, PostWithUserDTO}
import dto.postRating.{AddPostRatingDTO, RatedPostForUserDTO}
import dto.user.{ChangePasswordDTO, CreateUserDTO, ImageDTO, UpdateUserInfoDTO, UserDTO}
import models.{CommentOnPost, Post, PostRating, User}
import play.api.libs.functional.syntax.toFunctionalBuilderOps

import java.sql.Timestamp
import play.api.libs.json._
import play.api.libs.json.Reads._
import play.api.libs.functional.syntax._
object jsonFormats {
  //TIMESTAMP FORMAT
  implicit val timestampFormat = new Format[Timestamp] {
    def writes(timestamp: Timestamp): JsValue = JsString(timestamp.toString)

    def reads(json: JsValue): JsResult[Timestamp] = json match {
      case JsString(timestampStr) => JsSuccess(Timestamp.valueOf(timestampStr))
      case _ => JsError("Invalid timestamp format")
    }
  }

  //USER FORMATS
  implicit val userFormat = Json.format[User]
  implicit val userDTOFormat = Json.format[UserDTO]
  implicit val updateUserInfoDTOFormat: Format[UpdateUserInfoDTO] = (
    (JsPath \ "username").format[String](minLength[String](3).keepAnd(maxLength[String](30))) and
      (JsPath \ "fullName").format[String](minLength[String](5).keepAnd(maxLength[String](50)))
    )(UpdateUserInfoDTO.apply, unlift(UpdateUserInfoDTO.unapply))
  implicit val createUserDTOFormat : Format[CreateUserDTO] = (
    (JsPath \ "username").format[String](minLength[String](3).keepAnd(maxLength[String](30))) and
      (JsPath \ "fullName").format[String](minLength[String](5).keepAnd(maxLength[String](50))) and
      (JsPath \ "password").format[String](minLength[String](6))
  )(CreateUserDTO.apply, unlift(CreateUserDTO.unapply))
  implicit val changePasswordDTOFormat: Format[ChangePasswordDTO] =
    (JsPath \ "newPassword")
      .format[String](pattern("""^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$""".r, "Password must have minimum 8 characters, at least one letter and one number"))
      .inmap(ChangePasswordDTO.apply, _.newPassword)


  //POST FORMATS
  implicit val postFormat = Json.format[Post]
  implicit val returnPostFormat = Json.format[PostDTO]
  implicit val createPostFormat = Json.format[CreatePostDTO]
  implicit val createPostFrontFormat = Json.format[CreatePostFrontDTO]
  implicit val postWithUserFormat = Json.format[PostWithUserDTO]

  //POSTRATING FORMATS
  implicit val postRatingFormat = Json.format[PostRating]
  implicit val addPostRatingFormat: OFormat[AddPostRatingDTO] = Json.format[AddPostRatingDTO]
  implicit val ratedPostForUserDTO = Json.format[RatedPostForUserDTO]

  //COMMENT FORMATS
  implicit val commentFormat = Json.format[CommentOnPost]
  implicit val returnCommentFormat = Json.format[CommentDTO]
  implicit val createCommentFormat = Json.format[CreateCommentDTO]
  implicit val createCommentFronFormat = Json.format[CreateCommentFrontDTO]
  implicit val returnCommentWithUserFormat = Json.format[CommentWithUserDTO]
//  implicit val postWithUserFormat = Json.format[PostWithUserDTO]

  //FRIEND REQUEST FORMATS
  implicit val createFriendRequestFormat = Json.format[CreateFriendRequestDTO]

  //IMAGE FORMATS
  implicit val imageFormat = Json.format[ImageDTO]
}

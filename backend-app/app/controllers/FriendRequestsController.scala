package controllers

import actions.AuthenticatedAction
import com.google.inject.Inject
import dto.friendRequest.CreateFriendRequestDTO
import play.api.libs.json.Json
import play.api.mvc.{BaseController, ControllerComponents}
import services.FriendRequestsService
import formats.jsonFormats.{userDTOFormat, createFriendRequestFormat}

import javax.inject.Singleton
import scala.concurrent.ExecutionContext

@Singleton
class FriendRequestsController  @Inject()(friendRequestsService: FriendRequestsService, authenticatedAction: AuthenticatedAction)(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext) extends BaseController {
  def getFriendRequestCount() = authenticatedAction.async(request => {
    friendRequestsService.getFriendRequestCount(request.userId.toLong).map(res => Ok(Json.toJson(res)))
  })

  def checkIfIAmRequesting(addresseeId: Long) = authenticatedAction.async (request=>{
    friendRequestsService.checkIfIAmRequesting(addresseeId, request.userId.toLong).map(res=>Ok(Json.toJson(res)))
  })

  def checkIfIAmRequested(addresseeId: Long) = authenticatedAction.async(request => {
    friendRequestsService.checkIfIAmRequested(addresseeId, request.userId.toLong).map(res => Ok(Json.toJson(res)))
  })

  def getFriendRequestsForUser() = authenticatedAction.async(request => {
    val userId: Long = request.userId.toLong
    friendRequestsService.getFriendRequestsForUser(userId).map(results => Ok(Json.toJson(results)))
  })

  def createFriendRequest() = authenticatedAction.async(parse.json[CreateFriendRequestDTO])(request => {
    val requesterId = request.userId.toLong
    val requestInfo = request.body
    friendRequestsService.createFriendRequest(requesterId, requestInfo.addresseeId).map {
      case Left(errorMessage) => Conflict(Json.obj("message" -> errorMessage))
      case Right(_) => Created(Json.obj("message" -> "request created"))
    }
  })

  def acceptFriendRequest(requesterId: Long) = authenticatedAction.async(request => {
    val addresseeId = request.userId.toLong

    friendRequestsService.acceptFriendRequest(requesterId, addresseeId).map(res => Ok(Json.toJson(res.toLong)))
  })

  def deleteFriendRequest(requesterId: Long) = authenticatedAction.async(request => {
    val addresseeId = request.userId.toLong

    friendRequestsService.deleteFriendRequest(requesterId, addresseeId).map(res => Ok(Json.toJson(res)))
  })
}

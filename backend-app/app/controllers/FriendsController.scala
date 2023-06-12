package controllers

import actions.AuthenticatedAction
import com.google.inject.Inject
import formats.jsonFormats.userDTOFormat
import play.api.libs.json.Json
import play.api.mvc._
import services.FriendsService

import scala.concurrent.ExecutionContext

class FriendsController  @Inject()(friendsService:FriendsService, authenticatedAction: AuthenticatedAction)(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext) extends BaseController {
  def getAllUsersThatAreNotFriends(username: Option[String], fullName: Option[String]) = authenticatedAction.async { request =>
    friendsService.getAllUsersThatAreNotFriends(request.userId.toLong, username, fullName).map(results => Ok(Json.toJson(results)))
  }

  def getFriendsForCurrentUser() = authenticatedAction.async(request => {
    val userId: Long = request.userId.toLong
    friendsService.getFriendsForUser(userId, request.userId.toLong).map(results => Ok(Json.toJson(results)))
  })

  def getFriendsForUser(userId:Long) = authenticatedAction.async( request=>
    friendsService.getFriendsForUser(userId, request.userId.toLong).map(results => Ok(Json.toJson(results)))
  )

  def unfriendUser(friendId: Long) = authenticatedAction.async(request => {
    val myId = request.userId.toLong
    friendsService.unfriendUser(friendId, myId).map(res => Ok(Json.toJson(res)))
  })

  def areFriends(friendId:Long) = authenticatedAction.async(request=>{
    friendsService.areFriends(friendId, request.userId.toLong).map(res=>Ok(Json.toJson(res)))
  })
}

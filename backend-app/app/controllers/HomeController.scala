package controllers

import javax.inject._
import play.api.mvc._
import repositories.tables.SlickTables

import scala.concurrent.ExecutionContext

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext) extends BaseController {
  def index() = Action {
    Ok("Hello World")
  }

}

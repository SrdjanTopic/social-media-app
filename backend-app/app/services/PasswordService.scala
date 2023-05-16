package services

import org.mindrot.jbcrypt.BCrypt

import javax.inject.{Inject, Singleton}

@Singleton
class PasswordService @Inject()() {

  def hashPassword(password: String): String =
     BCrypt.hashpw(password, BCrypt.gensalt())

  def comparePasswords(pw1:String, pw2:String): Boolean =
    BCrypt.checkpw(pw1, pw2)
}

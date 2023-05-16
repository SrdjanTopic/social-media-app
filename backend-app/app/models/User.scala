package models

import java.sql.Blob


case class User(
               id: Long = -1,
               username: String,
               fullName: String,
               password: String,
//todo               profilePicture: Option[Blob]
               )

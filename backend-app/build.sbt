name := """social-media-app"""
organization := "com.example"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.13.10"

libraryDependencies ++= Seq(
  guice,
  "org.scalatestplus.play" %% "scalatestplus-play" % "5.0.0" % Test,
  jdbc,
  evolutions,
  "mysql" % "mysql-connector-java" % "8.0.27",
  "com.typesafe.play" %% "play-slick" % "5.0.0",
  "com.typesafe.play" %% "play-slick-evolutions" % "5.0.0" % Test,
  "org.scalactic" %% "scalactic" % "3.2.7",
  "org.scalatest" %% "scalatest" % "3.2.15" % Test,
  "org.scalatestplus" %% "mockito-3-4" % "3.2.10.0" % Test
)

libraryDependencies += "org.mindrot" % "jbcrypt" % "0.3m"

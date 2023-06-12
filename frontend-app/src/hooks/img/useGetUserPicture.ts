import { useState, useEffect } from "react";
import imageService from "../../services/imageService";
import defaulPic from "../../assets/defaultUserImg.jpg";

export default function useGetUserPicture(userId: number) {
  const [picture, setPicture] = useState<string>(defaulPic);

  useEffect(() => {
    imageService
      .getUserProfilePicture(userId)
      .then((pictureString) => {
        if (pictureString) setPicture(`data:image/png;base64,${pictureString}`);
        else setPicture(defaulPic);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return picture;
}

import { useState, useEffect } from "react";
import imageService from "../../services/imageService";

export default function useGetUserPicture(userId: number) {
  const [picture, setPicture] = useState<string | null>(null);

  useEffect(() => {
    imageService
      .getUserProfilePicture(userId)
      .then((pictureString) =>
        setPicture(`data:image/png;base64,${pictureString}`)
      )
      .catch((err) => console.log(err));
  }, [userId]);

  return picture;
}

import { useState, useEffect } from "react";
import imageService from "../../services/imageService";

export default function useGetPostPicture(postId: number) {
  const [picture, setPicture] = useState<string | null>(null);

  useEffect(() => {
    imageService
      .getPostPicture(postId)
      .then((pictureString) =>
        setPicture(`data:image/png;base64,${pictureString}`)
      )
      .catch((err) => console.log(err));
  }, []);

  return picture;
}

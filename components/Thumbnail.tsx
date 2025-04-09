"use client";
import Image from "next/image";
import { useState } from "react";

const Thumbnail = ({ thumbnail }: { thumbnail: string | undefined }) => {
  const fallback = "/no-img.jpg";

  const initialSrc =
    thumbnail === "self" || thumbnail === "default" ? fallback : thumbnail;

  const [imgSrc, setImgSrc] = useState(initialSrc);

  return (
    <Image
      src={imgSrc || ""}
      height={40}
      width={40}
      alt={"Thumbnail"}
      className="rounded-full object-cover"
      onError={() => {
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
    />
  );
};

export default Thumbnail;

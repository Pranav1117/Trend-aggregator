"use client";
import Image from "next/image";
import { useState } from "react";

const Thumbnail = ({ item }: { item: any }) => {
  const fallback = "/no-img.jpg";

  const initialSrc =
    item?.thumbnail === "self" || item?.thumbnail === "default"
      ? fallback
      : item?.thumbnail;
  const [imgSrc, setImgSrc] = useState(initialSrc);

  return (
    <Image
      src={imgSrc}
      height={40}
      width={40}
      alt={item?.title || "Thumbnail"}
      className="rounded-full object-cover"
      onError={() => {
        if (imgSrc !== fallback) setImgSrc(fallback);
      }}
    />
  );
};

export default Thumbnail;

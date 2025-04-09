"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { timeAgo } from "@/lib/utils";

const PostSummary = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const platform = searchParams.get("platform");
  const title = searchParams.get("title");
  const channel = searchParams.get("channel");
  const publishAt = searchParams.get("publishAt");

  const [data, setData] = useState("");

  useEffect(() => {
    async function getAIResponse() {
      try {
        const res = await axios.post(
          `/api/summarize?platform=${platform}&id=${id}`
        );
        // TODO => return proper response
        setData(res.data.choices[0].message.content);
      } catch (error) {
        console.error("Error fetching response:", error);
      }
    }
    getAIResponse();
  }, [platform, id]);

  return (
      <div className="bg-neutral-900 text-white min-h-[100vh]">
        {" "}
        <div className="pt-22 p-6 md:p-0 md:w-[60%] mx-auto">
          <div className="mb-8 border-b-1 border-gray-600 py-3">
            <h2 className="md:text-4xl mb-4">{title}</h2>
            <div className="flex justify-between items-center">
              <div className="">
                <div>{channel}</div>
                <div className="text-xs text-neutral-400">
                  {timeAgo(publishAt || "")}
                </div>
              </div>
              <span className="px-2 py-1 h-[30px] bg-neutral-700 rounded text-sm ">
                {platform}
              </span>
            </div>
          </div>
          {!data ? (
            <p className="text-neutral-400">Summarizing discussion...</p>
          ) : (
            data.split("\n").map((line, index) => (
              <p
                className={`${
                  line.startsWith("**")
                    ? "text-2xl font-semibold mt-6"
                    : "text-gray-300"
                }`}
                key={index}
              >
                {line}
              </p>
            ))
          )}
        </div>
      </div>
  );
};

export default PostSummary;

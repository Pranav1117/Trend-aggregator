import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
import { timeAgo } from "../utils";
import useStore from "@/app/store/useStore";

const Content = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const activeFilter = useStore((state) => state.activeFilter);
  const searchQuery = useStore((state) => state.searchQuery);
  const fetchedData = useStore((state) => state.fetchedData);
  const setFetchedData = useStore((state) => state.setFetchedData);

  useEffect(() => {
    const fetchData = async (query?: string) => {
      try {
        const { status, data } = await axios(
          // `http://192.168.0.104:3000/api/search?q=${query || "trending"}`
          "http://192.168.0.104:3000/api/twittertest"
        );
        console.log(data, status);
        if (status === 200) {
          setFetchedData(data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(searchQuery);
  }, []);
  console.log(fetchedData);
  return (
    <main
      className={`flex flex-col p-6 overflow-y-auto transition-transform transform ml-4 w-[100%] md:w-[75%]
        ${isSidebarOpen ? "md:translate-x-60" : "md:translate-x-40"}
        `}
    >
      <h2 className="text-xl font-bold px-4 mb-4 ">
        Results by {activeFilter}
      </h2>
      <div className="flex flex-col gap-4">
        {fetchedData.length > 0
          ? fetchedData
              ?.filter((value) => activeFilter === value.source)
              .map((item, index) => (
                <div
                  key={item.key}
                  className="p-4 shadow-md cursor-pointer border-b-[0.1px] border-neutral-800 space-y-2 hover:bg-neutral-800"
                >
                  {/*Thumbnail publishedat and channel */}
                  <div className="flex gap-2 items-center">
                    <Image
                      src={item.thumbnail || ""}
                      // src={"/1.png"}
                      height={20}
                      width={20}
                      alt="s"
                      className="rounded-full object-cover"
                    />
                    <p className="text-neutral-300 text-[13px]">
                      {item?.channelTitle}
                    </p>
                    <span className="text-neutral-300 ">•</span>
                    <p className="text-neutral-400 text-[13px]">
                      {timeAgo(item.publishedAt)}
                    </p>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  {/* Description */}
                  <p className="text-neutral-400">
                    {item.description
                      ? item.description.length > 550
                        ? `${item.description.slice(0, 550)}...`
                        : item.description
                      : "No description"}
                  </p>
                </div>
              ))
          : "loading"}
      </div>
    </main>
  );
};

export default Content;

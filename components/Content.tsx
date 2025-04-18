import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { timeAgo } from "../src/lib/utils";
import useStore from "@/app/store/useStore";
import Thumbnail from "./Thumbnail";
import ContentLoader from "./SkeletonLoaders/ContentLoader";

const Content = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const router = useRouter();

  const activeFilter = useStore((state) => state.activeFilter);
  const searchQuery = useStore((state) => state.searchQuery);
  const fetchedData = useStore((state) => state.fetchedData);
  const loading = useStore((state) => state.loading);

  const setLoading = useStore((state) => state.setLoading);
  const setFetchedData = useStore((state) => state.setFetchedData);

  useEffect(() => {
    const fetchData = async (query?: string) => {
      const url =
        activeFilter === "most_shared"
          ? `/api/engagement`
          : `/api/search?q=${query || "trending"}`;
      try {
        const { status, data } = await axios(url);
        if (status === 200) {
          setFetchedData(data.result);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(searchQuery);
    // TODO => optimize dependency
  }, [activeFilter]);
  return (
    <main
      className={`flex flex-col p-4 md:p-6 overflow-y-auto transition-transform transform md:ml-4  w-[100%] md:w-[75%]
        ${isSidebarOpen ? "md:translate-x-60" : "md:translate-x-40"}
        `}
    >
      {loading ? (
        [0, 1, 2, 3, 4].map((_, index) => (
          <div key={index} className="flex flex-col">
            <ContentLoader />
          </div>
        ))
      ) : (
        <>
          <h2 className="text-xl font-bold px-4 mb-4 ">
            Results by{" "}
            {activeFilter === "most_shared" ? "Engagement" : activeFilter}
          </h2>
          <div className="flex flex-col gap-4">
            {fetchedData.length > 0 && activeFilter === "most_shared"
              ? fetchedData.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 shadow-md cursor-pointer border-b-[0.1px] border-neutral-800 space-y-2 hover:bg-neutral-800"
                    onClick={() =>
                      router.push(
                        `/postsummary?id=${item?.id}&platform=${item?.source}&title=${item.title}&channel=${item.channel}&publishAt=${item.publishedAt}`
                      )
                    }
                  >
                    {/*Thumbnail publishedat and channel */}
                    <div className="flex gap-2 items-center">
                      <Thumbnail thumbnail={item.thumbnail} />
                      <p className="text-neutral-300 text-[13px]">
                        {item?.channel}
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
                    <span className="px-2 py-1 bg-neutral-700 rounded">
                      {item.source}
                    </span>
                  </div>
                ))
              : ""}

            {fetchedData.length > 0 &&
            (activeFilter === "reddit" || activeFilter === "youtube")
              ? fetchedData
                  ?.filter((value) => activeFilter === value.source)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="p-4 shadow-md cursor-pointer border-b-[0.1px] border-neutral-800 space-y-2 hover:bg-neutral-800"
                      onClick={() =>
                        router.push(
                          `/postsummary?id=${item?.id}&platform=${item?.source}&title=${item.title}&channel=${item.channel}&publishAt=${item.publishedAt}`
                        )
                      }
                    >
                      {/*Thumbnail publishedat and channel */}
                      <div className="flex gap-2 items-center">
                        <Thumbnail thumbnail={item.thumbnail} />
                        <p className="text-neutral-300 text-[13px]">
                          {item?.channel}
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
              : ""}
          </div>
        </>
      )}
    </main>
  );
};

export default Content;
